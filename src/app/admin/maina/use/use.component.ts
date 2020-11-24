import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-use',
  templateUrl: './use.component.html',
  styleUrls: ['./use.component.css']
})
export class UseComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) {
    super(injector)
  }
  user:any="";
  taikhoan:any="";
  matkhau: any = "";
  idrole: any="";
  them:any =true;
  item:any;
  itemsinger:any;
  i:any = 0;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/user/get_user_pagesize?pagesize="+10+"&&pageindex="+0+"&&search=").subscribe(res=>{
        this.item = res;
        console.log(this.item);
      })
    })
  }
  edit(id){
    this.them = false;
    this._api.get("api/user/get_user_id/"+id).subscribe(res=>{
      this.itemsinger = res;
      this.taikhoan = this.itemsinger.taikhoan;
      this.matkhau = this.itemsinger.matkhau;
      this.idrole = this.itemsinger.idrole;
      console.log(this.itemsinger);
    });
  }
  create(){
    this.them = true;
    this.taikhoan = "";
    this.matkhau = "";
    this.idrole = "";
  }
  loaddata(){
    this._api.get("api/user/get_user_pagesize?pagesize="+10+"&&pageindex="+0+"&&search=").subscribe(res=>{
      this.item = res;
      console.log(this.item);
    })
  }
  exec(tk, mk, idr){
    var Formdata = {
      taikhoan: tk,
      matkhau: mk,
      idrole: idr
    }
    if(this.them){
      this._api.post("api/user/create_user",Formdata).subscribe(res=>{
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
      this._api.put("api/user/edit_user_matkhau"+this.itemsinger.madonvi,Formdata).subscribe(res=>{
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
        this._api.delete("api/user/delete_user/"+id).subscribe(res=>{
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

