const uber_car = "uberCar";
const uber_suv = "uberSUV";
const uber_black = "uberBlack";

//hàm lấy giá tiền km đầu tien
const kiemtragiakmdautien = (loaixe) => {
  switch (loaixe) {
    case uber_car:
      return 8000;
    case uber_suv:
      return 9000;
    case uber_black:
      return 10000;
  }
};
//hàm lấy giá tiền km từ 1 đến 19
const kiemtragiakmtu1den19 = (loaixe) => {
  switch (loaixe) {
    case uber_car:
      return 7500;
    case uber_suv:
      return 8500;
    case uber_black:
      return 9500;
  }
};
//hàm lấy giá tien 19km tro lên
const kiemtragia19kmtrolen = (loaixe) => {
  switch (loaixe) {
    case uber_car:
      return 7000;
    case uber_suv:
      return 8000;
    case uber_black:
      return 9000;
  }
};

//hàm lấy giá tien thoi gian cho
const kiemtragiakmthoigiancho = (loaixe) => {
  switch (loaixe) {
    case uber_car:
      return 2000;
    case uber_suv:
      return 3000;
    case uber_black:
      return 3500;
  }
};

document.getElementById("btn-tinhtien").onclick = () => {
  // lấy dữ liệu từ người dùng và và lưu  trữ {loại xe người dùng,sokm thời diểm chớ}
  // console.log("bấm vào đây")
  let sokm = document.getElementById("txt-km").value * 1;
  console.log(sokm);
  let thoigiancho = document.getElementById("txt-thoiGianCho").value * 1;
  console.log(thoigiancho);
  let loaixe = document.querySelector("input[type='radio']:checked").value;
  console.log(loaixe);

  let tongtien = tongTien(sokm, thoigiancho, loaixe);

  // // debugger

  document.getElementById("divThanhTien").style.display = "block";
  document.getElementById("xuatTien").innerHTML = tongtien.toLocaleString(
    "vi",
    {
      currency: "VND",
      style: "currency",
    }
  );
  // text thử modal
  return tongtien;
};
function tongTien(sokm, thoigiancho, loaixe) {
  sokm = document.getElementById("txt-km").value * 1;
  console.log(sokm);
  thoigiancho = document.getElementById("txt-thoiGianCho").value * 1;
  console.log(thoigiancho);
  loaixe = document.querySelector("input[type='radio']:checked").value;
  console.log(loaixe);

  let giatienkmdautien = kiemtragiakmdautien(loaixe);
  let giatientu1den19km = kiemtragiakmtu1den19(loaixe);
  let giatientu19kmtrolen = kiemtragia19kmtrolen(loaixe);
  let tongtien = 0;
  // debugger
  if (sokm <= 1 && sokm > 0) {
    tongtien = sokm * giatienkmdautien + GTTHOIGIANCHO(thoigiancho, loaixe);
  } else if (sokm <= 19 && sokm > 1) {
    tongtien =
      giatienkmdautien +
      (sokm - 1) * giatientu1den19km +
      GTTHOIGIANCHO(thoigiancho, loaixe);
  } else if (sokm > 19) {
    tongtien =
      giatienkmdautien +
      18 * giatientu1den19km +
      (sokm - 19) * giatientu19kmtrolen +
      GTTHOIGIANCHO(thoigiancho, loaixe);
  }
  console.log(tongtien);
  return tongtien;
}
function GTTHOIGIANCHO(thoigiancho, loaixe) {
  loaixe = document.querySelector("input[type='radio']:checked").value;
  thoigiancho = document.getElementById("txt-thoiGianCho").value * 1;
  let giatienthoigiacho = kiemtragiakmthoigiancho(loaixe);

  // thời gian chờ
  if (0 < thoigiancho && thoigiancho <= 3) {
    giatienthoigiacho *= 0;
  } else if (thoigiancho > 3 && thoigiancho % 3 == 0) {
    giatienthoigiacho *= thoigiancho / 3 - 1;
  } else if (thoigiancho > 3 && thoigiancho % 3 != 0) {
    giatienthoigiacho *= Math.floor(thoigiancho / 3);
  }
  return giatienthoigiacho;
}
document.getElementById("btn-inHoaDon").onclick = () => {
  // lấy dữ liệu từ người dùng và và lưu  trữ {loại xe người dùng,sokm thời diểm chớ}
  // console.log("bấm vào đây")
  let sokm = document.getElementById("txt-km").value * 1;
  console.log(sokm);
  let thoigiancho = document.getElementById("txt-thoiGianCho").value * 1;
  console.log(thoigiancho);
  let loaixe = document.querySelector("input[type='radio']:checked").value;
  console.log(loaixe);

  let tongtien = tongTien(sokm, thoigiancho, loaixe);
  let bodyModal = document.getElementById("modal-body");

  if (sokm <= 1 && sokm > 0) {
    bodyModal.innerHTML = `<table style="border-collapse: collapse; width:100% ;">
 <thead>
   <tr>
     <th colspan="4" style="text-align: center;">CHI TIẾT HÓA ĐƠN</th>
 
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>CHI TIẾT</td>
     <td>SỬ DỤNG</td>
     <td>ĐƠN GIÁ (Đ)</td>
     <td>THÀNH TIỀN(Đ)</td>
   </tr>
   <tr>
     <td>LOẠI XE</td>
     <td colspan="3">${loaixe}</td>
   </tr>
   <tr>
     <td>KM(ĐẦU TIÊN)</td>
     <td>${sokm}</td>
     <td>${kiemtragiakmdautien(loaixe)}</td>
     <td>${sokm * kiemtragiakmdautien(loaixe)}</td>
   </tr>
   <tr>
     <td>Thời gian chở (Phút)</td>
     <td>${thoigiancho}</td>
     <td>${kiemtragiakmthoigiancho(loaixe)}</td>
     <td>${GTTHOIGIANCHO(thoigiancho, loaixe)}</td>
   </tr>
   <tr>
     <td colspan="4" style="text-align: right;"> TỔNG TIỀN: ${tongtien.toLocaleString(
       "vi",
       {
         currency: "VND",
         style: "currency",
       }
     )}
     </td>
 
   </tr> 
   </table>`
   
  } else if (sokm <= 19 && sokm > 1) { 
    bodyModal.innerHTML = `<table style="border-collapse: collapse; width:100% ;">
   <thead>
     <tr>
       <th colspan="4" style="text-align: center;">CHI TIẾT HÓA ĐƠN</th>
   
     </tr>
   </thead>
   <tbody>
     <tr>
       <td>CHI TIẾT</td>
       <td>SỬ DỤNG</td>
       <td>ĐƠN GIÁ (Đ)</td>
       <td>THÀNH TIỀN(Đ)</td>
     </tr>
     <tr>
       <td>LOẠI XE</td>
       <td colspan="3">${loaixe}</td>
     </tr>
     <tr>
       <td>KM(ĐẦU TIÊN)</td>
       <td>${1}</td>
       <td>${kiemtragiakmdautien(loaixe)}</td>
       <td>${kiemtragiakmdautien(loaixe)}</td>
     </tr>
     <tr>
       <td>Từ 2 đến ${sokm}</td>
       <td>${sokm - 1}</td>
       <td>${kiemtragiakmtu1den19(loaixe)}</td>
       <td>${kiemtragiakmtu1den19(loaixe) * (sokm - 1)}</td>
   
     </tr>
     <tr>
       <td>Thời gian chở (Phút)</td>
       <td>${thoigiancho}</td>
       <td>${kiemtragiakmthoigiancho(loaixe)}</td>
       <td>${GTTHOIGIANCHO(thoigiancho, loaixe)}</td>
     </tr>
     <tr>
       <td colspan="4" style="text-align: right;"> TỔNG TIỀN: ${tongtien.toLocaleString(
         "vi",
         {
           currency: "VND",
           style: "currency",
         }
       )}
       </td>
   
     </tr>
   </table>
`
  } else if (sokm > 19) {
    bodyModal.innerHTML = `<table style="border-collapse: collapse; width:100% ;">
<thead>
  <tr>
    <th colspan="4" style="text-align: center;">CHI TIẾT HÓA ĐƠN</th>

  </tr>
</thead>
<tbody>
  <tr>
    <td>CHI TIẾT</td>
    <td>SỬ DỤNG</td>
    <td>ĐƠN GIÁ (Đ)</td>
    <td>THÀNH TIỀN(Đ)</td>
  </tr>
  <tr>
    <td>LOẠI XE</td>
    <td colspan="3">${loaixe}</td>
  </tr>
  <tr>

  <td>KM(ĐẦU TIÊN)</td>
  <td>${1}</td>
  <td>${kiemtragiakmdautien(loaixe)}</td>
  <td>${kiemtragiakmdautien(loaixe)}</td>
  </tr>
  <tr>
  <td>Từ 2 đến 19</td>
  <td>18</td>
  <td>${kiemtragiakmtu1den19(loaixe)}</td>
  <td>${kiemtragiakmtu1den19(loaixe) * 18}</td>

</tr>
<tr>
    <td> Từ 19 đến ${sokm}</td>
    <td>${sokm-19}</td>
    <td>${kiemtragia19kmtrolen(loaixe)}</td>
    <td>${kiemtragia19kmtrolen(loaixe)*(sokm-19)}</td></td>
  </tr>
  <tr>
    <td>Thời gian chở (Phút)</td>
    <td>${thoigiancho}</td>
    <td>${kiemtragiakmthoigiancho(loaixe)}</td>
    <td>${GTTHOIGIANCHO(thoigiancho, loaixe)}</td>
  </tr>
  <tr>
    <td colspan="4" style="text-align: right;"> TỔNG TIỀN: ${tongtien.toLocaleString(
      "vi",
      {
        currency: "VND",
        style: "currency",
      }
    )}
    </td>

  </tr>
</table>
`  }   
  // text thử modal
  $("#myModal").modal("show");
};
