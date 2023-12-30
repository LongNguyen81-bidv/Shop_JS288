let dsTivi = [];
let dsNhom = [];
let ds = [];

const keyCode = (event) => {
    //console.log(event.keyCode)
    if (event.keyCode != 0 || event.keyCode == 13) {
        //event.keyCode == 13  => người dùng nhấn phím Enter

        let gtTim = event.target.value
        //console.log(gtTim)
        let dsTim = ds.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()))
        xuatTivi(dsTim, thTivi)
    }
}

// const keyCode_1 = (event) => {
//     // onchange
//     if (event.keyCode != 0) {
//         let gtTim = event.target.value
//         console.log(gtTim)
//         let dsTim = ds.filter(x => x.Ten.toLowerCase().includes(gtTim.toLowerCase()))
//         xuatTivi(dsTim, thTivi)
//     }

// }

const locGia = (tag) => {

    ds.sort((a, b) => {
        return a.Don_gia_Ban - b.Don_gia_Ban
    })
    let min = ds[0].Don_gia_Ban;
    let max = ds[ds.length - 1].Don_gia_Ban;
    tag.setAttribute("min", min);
    tag.setAttribute("max", max);
    tag.setAttribute("step", 10000);
    tag.setAttribute("value", max);

    document.getElementById("lblGia").innerHTML = `<= ${Number(tag.value).toLocaleString()}<sup>đ</sup>`
    let tmp = ds.filter(x => x.Don_gia_Ban <= Number(tag.value));
    //console.log(tag.value)
    xuatTivi(tmp, thTivi)
}


const xuatTivi = (ds = [], Tag) => {
    let html = ``;

    ds.forEach((item) => {
        html += `
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="${urlImage}/${item.Ma_so}.png" alt="..." onclick="showModal(this)" />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${item.Ten}</h5>
                            <!-- Product reviews-->
                            <div class="d-flex justify-content-center small text-warning mb-2">
                                <div class="bi-star-fill"></div>
                                <div class="bi-star-fill"></div>
                                <div class="bi-star-fill"></div>
                                <div class="bi-star-fill"></div>
                                <div class="bi-star-fill"></div>
                            </div>
                            <!-- Product price-->
                            <span class="text-muted">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></span>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                        <a class="btn btn-sm btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="addToCart('${item.Ma_so}',1)">Add to cart</a></div>
                    </div>
                </div>
            </div>
        `

    })
    Tag.innerHTML = html;
    // locGia()
}

const taoNhom = () => {

    dsNhom = Array.from(new Set(dsTivi.map(x => x.Nhom.Ma_so))).map(Ma_so => {
        nhom = {
            Ma_so: Ma_so,
            Ten: dsTivi.find(x => x.Nhom.Ma_so == Ma_so).Nhom.Ten.toUpperCase()
        }
        return nhom
    })

    dsNhom.unshift({
        "Ma_so": "ALL",
        "Ten": "ALL"
    })

}

const xuatNhom = (dsNhom = [], Tag) => {
    let html = ``
    dsNhom.forEach((nhom, index) => {

        let classActive = (index == 0) ? "active" : "";

        html += `
        <button id="btn${nhom.Ma_so}" class="btn btn-sm btn-outline-dark ${classActive}" onclick="xuatSanphamtheoNhom('${nhom.Ma_so}')" >${nhom.Ten}</button>
        `
    })
    Tag.innerHTML = html;
}

const xuatSanphamtheoNhom = (maNhom) => {
    ds = [];
    if (maNhom == "ALL") {
        ds = dsTivi;
    } else {
        ds = dsTivi.filter(x => x.Nhom.Ma_so.toLowerCase() == maNhom.toLowerCase());
    }

    document.getElementsByClassName("btn-outline-dark active")[0].classList.remove("active");
    document.getElementById(`btn${maNhom}`).classList.add("active");
    xuatTivi(ds, thTivi)
    locGia(thGia)

}

const sapXepGia = (btn) => {
    // locGia(this)
    let sort = btn.getAttribute("sort");
    if (Number(sort) == 1) {
        //Tăng
        // Sắp Giá tăng
        ds.sort((a, b) => {
            return a.Don_gia_Ban - b.Don_gia_Ban
        })
        btn.setAttribute("sort", "-1");
        btn.innerHTML = " Giá &Uparrow;";
    } else {
        //Giảm
        // Sắp Giá giảm
        ds.sort((a, b) => {
            return b.Don_gia_Ban - a.Don_gia_Ban
        })
        btn.setAttribute("sort", "1");
        btn.innerHTML = " Giá &Downarrow;";
    }
    xuatTivi(ds, thTivi)
}

const sapXepTen = (btn) => {
    let sort = btn.getAttribute("sort");
    if (Number(sort) == 1) {
        //Tăng
        // Sắp Tên tăng
        ds.sort((a, b) => {
            return a.Ten.toLowerCase().localeCompare(b.Ten.toLowerCase())
        })
        btn.setAttribute("sort", "-1");
        btn.innerHTML = " Tên &Uparrow;";
    } else {
        //Giảm
        // Sắp Tên giảm
        ds.sort((a, b) => {
            return b.Ten.toLowerCase().localeCompare(a.Ten.toLowerCase())
        })
        btn.setAttribute("sort", "1");
        btn.innerHTML = " Tên &Downarrow;";
    }
    xuatTivi(ds, thTivi)
}

