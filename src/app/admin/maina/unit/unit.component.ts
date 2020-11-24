import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) { 
    super(injector)
  }
  donvi:any="";
  tyle:any="";
  ghichu: any = "";
  them:any =true;
  item:any;
  itemsinger:any;
  i:any = 0;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/donvi/get_don_vi_all").subscribe(res=>{
        this.item = res;
        console.log(this.item);
      })
    })
  }
  edit(id){
    this.them = false;
    this._api.get("api/donvi/get_don_vi_by_id/"+id).subscribe(res=>{
      this.itemsinger = res;
      this.donvi = this.itemsinger.tendonvi;
      this.ghichu = this.itemsinger.ghichu;
      this.tyle = this.itemsinger.tyle;
      console.log(this.itemsinger);
    });
  }
  create(){
    this.them = true;
    this.donvi = "";
    this.ghichu = "";
    this.tyle = "";
  }
  loaddata(){
    this._api.get("api/donvi/get_don_vi_all").subscribe(res=>{
      this.item = res;
      console.log(this.item);
    })
  }
  exec(dv,tl,gc){
    var Formdata = {
      tendonvi: dv,
      ghichu: gc,
      tyle: parseInt(tl)
    }
    if(this.them){
      this._api.post("api/donvi/create_don_vi",Formdata).subscribe(res=>{
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
      this._api.put("api/donvi/edit_don_vi/"+this.itemsinger.madonvi,Formdata).subscribe(res=>{
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
        this._api.delete("api/donvi/delete_don_vi/"+id).subscribe(res=>{
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
