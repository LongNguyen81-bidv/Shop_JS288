
var capNhat = true;
const Xuat_Danh_sach = (ds) => {

    let html = ``;
    ds.sort((a, b) => a.Ten.localeCompare(b.Ten))
    ds.forEach((item, index) => {
        html += `
        <tr>
            <td scope="row" class="text-center">${item.Ma_so}</td>
            <td class="text-center">
                <img src='${Dia_chi_Img}/${item.Ma_so}.png' class="" />
            </td>
            <td>${item.Ten}</td>
            
            <td class="text-right">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></td>
            <td class="text-center">${item.Nhom.Ma_so}</td>
            <td>
                <a href="javaScript:void(0)" data-toggle="modal" data-target="#modelId" title='Sửa Food' onclick="updateFood('${item.Ma_so}')">
                    <i class="fa fa-pencil-square-o text-danger" aria-hidden="true"></i>
                </a>
            </td>
            <td>
                <a href="javaScript:void(0)" onclick="deleteFood('${item.Ma_so}')" title='Xóa Food'>
                    <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
        `
    })

    document.querySelector("#Th_Danhsach").innerHTML = html;
}

const KeyCode = (event) => {
    if (event.keyCode == 13) {
        let gtTim = event.target.value.trim()
        let ds = dsTivi.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()))
        Xuat_Danh_sach(ds)

    }
}
// Add Food
const insertFood = () => {
    capNhat = true;
    showModal();
}
// Update Food
const updateFood = (key) => {
    capNhat = false;
    let item = dsFood.find(x => x.Ma_so == key);
    showModal(item);

}
// Delete food
const deleteFood = (key) => {
    if (confirm('Hệ thống sẽ Xóa Dữ liệu...?')) {
        let condition = {
            "Ma_so": key
        }
        apiFoodDelete(condition).then(result => {
            alert('Xóa thành công');
            window.location.reload();
        })
    }
}
// Show Modal
const showModal = (item = null) => {
    let urlImg = null;
    let Nhom = "";
    document.querySelector("#ModalTitle").innerHTML = `Thêm Food`;
    if (item) {
        document.querySelector("#ModalTitle").innerHTML = `Sửa Food`;
        urlImg = `${Dia_chi_Img}/${item.Ma_so}.png`;
        Nhom = item.Nhom.Ma_so;
    }

    let html = ``
    html += `
    <div class="form-group">
        <input type="text" class="form-control" id="Th_Ma_so" style="visibility: hidden;"
            value="${item ? item.Ma_so : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Ten">Tên</label>
        <input type="text" class="form-control" id="Th_Ten" 
            placeholder="Tên Sản phẩm" value="${item ? item.Ten : ''}">
    </div>
    
    <div class="form-group">
        <label for="Th_Don_gia_Ban">Đơn giá Bán</label>
        <input type="number" class="form-control" id="Th_Don_gia_Ban" 
            placeholder="Đơn giá Bán" value="${item ? item.Don_gia_Ban : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Nhom_Food">Nhóm Food</label>
        <select id="Th_Nhom_Food">
            <option value="MON_AN" ${Nhom == 'MON_AN' ? 'selected' : ''} >MON_AN</option>
            <option value="CA_PHE" ${Nhom == 'CA_PHE' ? 'selected' : ''} >CA_PHE</option>
        </select>
    </div>
    <div class="form-group">
        <label for="Th_File">Chọn hình</label>
        <input type="file" class="form-control-file" id="Th_File" onchange="previewImg()">`
    if (!item) {
        html += `<img id="Th_PreImg" style="width:10rem"  />`
    } else {
        html += `<img id="Th_PreImg" style="width:10rem" src="${urlImg}"  />`
    }

    html += `</div>`

    document.querySelector("#ModalBody").innerHTML = html

}
// Preview Image
const previewImg = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
        console.log(e.target.result)
        Th_PreImg.src = e.target.result;
    }
    reader.readAsDataURL(document.querySelector("#Th_File").files[0]);

}
// Get key end, create key new
const autoKey = () => {
    let keyNhom = Th_Nhom_Food.value;
    let arrNhom = dsFood.filter(x => x.Nhom.Ma_so == keyNhom)
    arrNhom.sort((a, b) => { return Number(a.Ma_so.trim().split("_")[2]) - Number(b.Ma_so.trim().split("_")[2]) })
    let keyEnd = arrNhom[arrNhom.length - 1];
    let num = Number(keyEnd.Ma_so.split("_")[2]) + 1;
    keyNhom = keyNhom.concat("_", num.toString());
    return keyNhom;
}

// Save 
const saveFood = () => {

    let Ma_so = (document.querySelector("#Th_Ma_so").value != "") ? document.querySelector("#Th_Ma_so").value : autoKey();
    // console.log(Ma_so);
    // return false;

    let Ten = document.querySelector("#Th_Ten").value.trim();

    let Don_gia_Ban = Number(document.querySelector("#Th_Don_gia_Ban").value);
    let Nhom_Food = document.querySelector("#Th_Nhom_Food").value;

    if (capNhat) {
        // Insert
        let foodNew = {
            "Ten": Ten,
            "Ma_so": Ma_so,
            "Don_gia_Ban": Don_gia_Ban,

            "Nhom": {
                "Ten": Nhom_Food,
                "Ma_so": Nhom_Food
            },
            "Danh_sach_Phieu_Dat": [],
            "Danh_sach_Phieu_Ban": [],
            "Danh_sach_Phieu_Nhap": []
        }

        //console.log(mobileNew)
        //return false;
        // Call API
        apiFoodInsert(foodNew).then(result => {
            console.log(result);
            saveImg(Ma_so);
            apiFood().then(result => {
                dsFood = result.noiDung;
                Xuat_Danh_sach(dsFood);
                document.querySelector("#ModalCancel").click();
            })
        })


    } else {
        // Update
        let foodUpdate = {
            condition: {
                "Ma_so": Ma_so
            },
            update: {
                $set: {
                    "Ten": Ten,
                    "Don_gia_Ban": Don_gia_Ban,

                    "Nhom": {
                        "Ten": Nhom_Food,
                        "Ma_so": Nhom_Food
                    }
                }

            }
        }
        // console.log(mobileUpdate)
        // Call API
        apiFoodUpdate(foodUpdate).then(result => {
            //console.log(result);
            saveImg(Ma_so);
            apiFood().then(result => {
                dsFood = result.noiDung;
                Xuat_Danh_sach(dsFood);
                document.querySelector("#ModalCancel").click();
            })
            //window.location.reload();
        })


    }


}

const saveImg = (Ma_so) => {
    let imgName = document.querySelector("#Th_File").value
    // Người dùng có chọn hình
    if (imgName) {
        let reader = new FileReader()
        let Chuoi_nhi_phan = ""
        // let Ten_Hinh = `${Ma_so}.png` // upload vào thư mục images trong dịch vụ nodejs
        let Ten_Hinh = `${Ma_so}` // upload lên trên host cloudinary
        reader.onload = function (e) {
            Chuoi_nhi_phan = e.target.result;
            let img = { "name": Ten_Hinh, "src": Chuoi_nhi_phan }
            //console.log(img)
            apiImageTivi(img).then(result => {
                //console.log(result)
                //reader.clear()    
            })

        }
        reader.readAsDataURL(document.querySelector("#Th_File").files[0])
    }
}


