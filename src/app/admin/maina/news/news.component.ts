import { Component, OnInit ,Injector, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
declare var CKEDITOR: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent extends BaseComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  constructor(private ijnector:Injector) {
    super(ijnector)
   }
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
   item:any;
   tieude:any="";
   hinhanh:any;
   loaitintuc:any;
   ngaydang:any="";
   insert:any = true;
   ckeditorContent:any;
   itemloai:any;
  ngOnInit(): void {
    CKEDITOR.on('instanceCreated', function (event, data) {
      var editor = event.editor,
      element = editor.element;
      editor.name = "content"
   });
    this._route.params.subscribe(params=>{   
      this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+10+"&&pageindex="+0+"&&search=").subscribe(res=>{
        this.item = res;
        console.log(this.item);
      });
      this._api.get("api/loaitintuc/get_loaitintuc_all").subscribe(res=>{
        this.itemloai = res;
        console.log(this.itemloai);
        this.loaitintuc = this.itemloai[0].id;
      });
    })
  }
  create(){
    this.insert = true;
    this.tieude = "";
    this.ngaydang = "";
    this.hinhanh = "";
    this.loaitintuc = this.itemloai[0].id;
    CKEDITOR.instances.content.setData("");
  }
  delete_(matt){
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
        this._api.delete("api/tintuc/delete_loaitintuc/"+matt).subscribe(res=>{
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
  edit(matt){
    this.insert = false;
    this._api.get("api/tintuc/get_tintuc_id/"+matt).subscribe(res=>{
      this.item = res;
      this.tieude = this.item.tieude;
      this.ngaydang = this.item.tomtat;
      this.hinhanh = "";
      this.loaitintuc = this.item.idloai;
      CKEDITOR.instances.content.setData(this.item.noidung);
    });
  }
  onimg(event){
    this.hinhanh = event.target;
  }
  itemsinger:any;
  loaddata(){
    this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+10+"&&pageindex="+1+"&&search=").subscribe(res=>{
      this.itemsinger = res;
    });
  }
  exec(td,nd,ltt){
    this.getEncodeFromImage(this.hinhanh).subscribe(res=>{
      var formdata = {
        tieude : td,
        ngaydang: nd,
        hinhanh : res,
        idloai : parseInt(ltt),
        noidung : CKEDITOR.instances.content.getData(),
        luotxem: 0
      }
      console.log(formdata);
      if(this.insert){
        this._api.post("api/tintuc/create_tintuc",formdata).subscribe(res=>{
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
        this._api.put("api/loaitintuc/edit_loaitintuc/"+this.itemsinger.id,formdata).subscribe(res=>{
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
    });   
  }
}
