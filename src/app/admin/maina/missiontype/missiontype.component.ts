import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-missiontype',
  templateUrl: './missiontype.component.html',
  styleUrls: ['./missiontype.component.css']
})
export class MissiontypeComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) {
    super(injector)
   }
   tenloainv:any;
   ghichu:any;
   c:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/loainhiemvu/get_loainhiemvu_pagesize?pagesize="+10+"&&pageindex="+0+"&&search=").subscribe(res=>{
        this.item = res;
        console.log(this.item);
      })
    })
  }
  them:any;
  itemsinger:any;
  item:any;
  edit(id){
    this.them = false;
    this._api.get("api/loainhiemvu/get_loainhiemvu_id/"+id).subscribe(res=>{
      this.itemsinger = res;
    });
  }
  create(){
    this.them = true;
  }
  loaddata(){
    this._api.get("api/loainhiemvu/get_loainhiemvu_pagesize?pagesize="+10+"&&pageindex="+0+"&&search=").subscribe(res=>{
      this.item = res;
      console.log(this.item);
    })
  }
  exec(tenlnv,gc,c){
    var Formdata = {
      tenloainv: tenlnv,
      ghichu: gc,
      c:c
    }
    if(this.them){
      this._api.post("api/loainhiemvu/create_loainhiemvu",Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm thành công',
            showConfirmButton: false,
            timer: 1500
          });         
          this.loaddata();
          $("#exampleModal").modal('hide');
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Thêm thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    }
    else{
      this._api.put("api/loainhiemvu/edit_loainhiemvu/"+this.itemsinger.madonvi,Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sửa thành công',
            showConfirmButton: false,
            timer: 1500
          });
          this.loaddata();
          $("#closeModel").click();
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Sửa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    }
  }
  delete_(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn sẽ không thể hoàn nguyên điều này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Không, hủy bỏ!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.delete("api/loainhiemvu/delete_loainhiemvu/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this.loaddata();
          }
          else{
            swalWithBootstrapButtons.fire(
              'Thất bại!',
              'Tệp của bạn chưa xóa.',
              'error'
            );
          }
        });
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Đã hủy',
          'Tệp của bạn an toàn :)',
          'error'
        );
      }
    })
  }
}
