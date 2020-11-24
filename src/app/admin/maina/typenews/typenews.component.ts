import { Component, OnInit, Injector, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-typenews',
  templateUrl: './typenews.component.html',
  styleUrls: ['./typenews.component.css']
})
export class TypenewsComponent extends BaseComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  tenloai:any ="";
  item:any;
  them:any=true;
  itemsinger:any;
  constructor(private ijnector:Injector) {
    super(ijnector)
   }
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/loaitintuc/get_loaitintuc_all").subscribe(res=>{
        this.item = res;
        console.log(this.item);
      })
    })
  }
  loaddata(){
    this._api.get("api/loaitintuc/get_loaitintuc_all").subscribe(res=>{
      this.item = res;
    })
  }
  edit(maloaitt){
    this.them = false;
    this._api.get("api/loaitintuc/get_loaitintuc_id/"+maloaitt).subscribe(res=>{
      this.itemsinger = res;
      this.tenloai = this.itemsinger.tenloaitt;
    })
  }
  delete_(maloaitt){
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
        this._api.delete("api/loaitintuc/delete_loaitintuc/"+maloaitt).subscribe(res=>{
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
  create(){
    this.them = true;
    this.tenloai = "";
  }
  exec(ltt){
    var Formdata = {
      Tenloaitt: ltt
    }
    if(this.them){
      this._api.post("api/loaitintuc/create_loaitintuc",Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm thành công',
            showConfirmButton: false,
            timer: 1500
          });         
          this.loaddata();
          this.closebutton.nativeElement.click();
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
      this._api.put("api/loaitintuc/edit_loaitintuc/"+this.itemsinger.id,Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sửa thành công',
            showConfirmButton: false,
            timer: 1500
          });
          this.loaddata();
          this.closebutton.nativeElement.click();
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
}
