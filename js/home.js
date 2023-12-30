
const xuatCuahang = (cuaHang, Tag) => {
    let html = ``;
    html += `
    <h1 class="display-4 fw-bolder">${cuaHang.Ten}</h1>
    <p class="lead fw-normal text-white-50 mb-0">
    ${cuaHang.Dia_chi} - ${cuaHang.Dien_thoai} - ${cuaHang.Email} 
    </p> 
    `
    Tag.innerHTML = html;
}

const xuatKhuyenmai = (ds = [], Tag, nhom) => {
    let html = ``;
    ds.slice(0, 4).forEach((item) => {
        html += `
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Sale badge-->
                    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
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
                            <span class="text-muted text-decoration-line-through">${item.Don_gia_Ban.toLocaleString()}<sup>đ</sup></span>
                            ${(item.Don_gia_Ban * 0.9).toLocaleString()}<sup>đ</sup>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <a class="btn btn-sm btn-outline-dark mt-auto" href="javaScript:void(0)" onclick="addToCart_KM('${item.Ma_so}',${nhom})">Add to cart</a></div>
                    </div>
                </div>
            </div>
        `

    })
    Tag.innerHTML = html;
}


