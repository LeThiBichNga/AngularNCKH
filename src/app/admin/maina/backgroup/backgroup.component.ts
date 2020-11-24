import { BaseComponent } from 'src/app/lib/base-component';
import { Component, Injector, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-backgroup',
  templateUrl: './backgroup.component.html',
  styleUrls: ['./backgroup.component.css']
})
export class BackgroupComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) { 
    super(injector)
  }
  linhvuc:any="";
  them:any =true;
  itt:any;
  ittsinger:any;
  i:any = 0;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/linhvuc/get_linhvuc_pagesize?pagesize="+10+"&&pageindex="+0+"&&search=").subscribe(res=>{
        this.itt = res;
        console.log(this.itt);
      })
    })
  }
  edit(id){
    this.them = false;
    this._api.get("api/linhvuc/get_linhvuc_id/"+id).subscribe(res=>{
      this.ittsinger = res;
      this.linhvuc = this.ittsinger.tenlinhvuc;
      console.log(this.ittsinger);
    });
  }
  create(){
    this.them = true;
    this.linhvuc = "";
  }
  loaddata(){
    this._api.get("api/linhvuc/get_linhvuc_pagesize?pagesize="+10+"&&pageindex="+0+"&&search=").subscribe(res=>{
      this.itt = res;
      console.log(this.itt);
    })
  }
  exec(tenlv){
    var Formdata = {
      tenlinhvuc: tenlv
    }
    if(this.them){
      this._api.post("api/donvi/create_linhvuc",Formdata).subscribe(res=>{
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
      this._api.put("api/linhvuc/edit_linhvuc/"+this.ittsinger.malinhvuc,Formdata).subscribe(res=>{
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
        this._api.delete("api/linhvuc/delete_linhvuc/"+id).subscribe(res=>{
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
