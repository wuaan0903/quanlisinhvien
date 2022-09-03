var data = [];

function checkdiem(diemtb){
    if(diemtb<4) return "F";
    if(diemtb>=4 && diemtb<5.5) return "D";
    if(diemtb>=5.5 && diemtb<7) return "C";
    if(diemtb>=7 && diemtb<8.5) return "B";
    if(diemtb>=8.5 && diemtb<=10) return "A";
}

function checkkq(diemtb){
    if(diemtb<4) return "FAIL";
    else return "PASS"
}
let index=-1;

function clear(){
    document.getElementById("masv").value=""
    document.getElementById("name").value=""
    document.getElementById("diemqt").value=""
    document.getElementById("diemthi").value=""
}

function edit(masv){
    for(let i=0;i<data.length;i++)
    {
        if(i==masv)
        {
            document.getElementById("masv").value=data[i].MaSV
            document.getElementById("name").value=data[i].Name
            document.getElementById("diemqt").value=data[i].DiemQT
            document.getElementById("diemthi").value=data[i].DiemThi
        }
    }
    index=masv;
}

function add(){
    var masv = document.getElementById("masv").value
    var name = document.getElementById("name").value
    var diemqt = document.getElementById("diemqt").value
    var diemthi = document.getElementById("diemthi").value
    var diemtb = (diemqt*3 + diemthi*7)/10
    var diemchu = checkdiem(diemtb)
    var ketqua = checkkq(diemtb)

    var item={
        MaSV : masv,
        Name : name,
        DiemQT : diemqt,
        DiemThi : diemthi,
        DiemTB : diemtb,
        DiemChu : diemchu,
        Ketqua : ketqua
    }
    if(masv=="" || name=="" || diemqt=="" || diemthi=="") {
        swal ( "Thất Bại" ,  "Bạn chưa điền đầy đủ các ô trống" ,  "error" )
    }
    else {
        if(index==-1)
        {
            data.push(item)
            swal("Thành Công !", "Bạn đã thêm thành công 1 sinh viên", "success");
        }
        else {
            data.splice(index,1,item)
            index=-1;
            swal("Thành Công !", "Bạn đã sửa thành công thông tin 1 sinh viên", "success");
        }
        }
    render()
    clear()
}
function render(){
    table = `<tr class="table-active" >
    <th>STT</th>
    <th>Mã SV</th>
    <th>Tên Sinh Viên</th>
    <th>Điểm QT</th>
    <th>Điểm Thi</th>
    <th>Điểm TB</th>
    <th>Điểm Chữ</th>
    <th>Kết Quả</th>
    <th>Chỉnh Sửa</th>
</tr>`
    for(let i=0;i<data.length;i++)
    {
        if(data[i].Ketqua=="PASS")
        {
            table = table + `<tr>
        <td>${i+1}</td>
        <td>${data[i].MaSV}</td>
        <td>${data[i].Name}</td>
        <td>${data[i].DiemQT}</td>
        <td>${data[i].DiemThi}</td>
        <td>${data[i].DiemTB}</td>
        <td>${data[i].DiemChu}</td>
        <td> <button class="ketqua" >${data[i].Ketqua}</button> </td>
        <th> 
        <button onclick="edit(${i})" class="edit" >Sửa</button>
        <button onclick="deleteSV(${i})" class="delete" >Xóa</button>
        </th>
    </tr>`
        }
        else{
            table = table + `<tr>
        <td>${i+1}</td>
        <td>${data[i].MaSV}</td>
        <td>${data[i].Name}</td>
        <td>${data[i].DiemQT}</td>
        <td>${data[i].DiemThi}</td>
        <td>${data[i].DiemTB}</td>
        <td>${data[i].DiemChu}</td>
        <td> <button class="ketquafail" >${data[i].Ketqua}</button> </td>
        <th> 
        <button onclick="edit(${i})" class="edit" >Sửa</button>
        <button onclick="deleteSV(${i})" class="delete" >Xóa</button>
        </th>
    </tr>`  
        }
    }
    document.getElementById("render").innerHTML = table
}

function deleteSV(masv){
    swal({
        title: "Bạn muốn xóa sinh viên này ?",
        text: "Bạn sẽ không thể khôi phục lại dữ liệu cho sinh viên này.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            for(let i=0;i<data.length;i++)
    {
        if(i==masv)
        {
            data.splice(i,1);
            render()
        }
    }

          swal("Đã xóa thành công sinh viên này !", {
            icon: "success",
          });
        } else {
          swal("OK! Hãy cẩn thận khi bấm nút XÓA");
        }
      });
}
