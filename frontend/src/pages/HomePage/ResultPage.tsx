// frontend/src/pages/HomePage/ResultPage.tsx
export const ResultPage = () => {
    return (
        <div>
            <h2>1/ Domain là gì?</h2>
            <p>- Domain (tên miền) là địa chỉ trực tuyến mà người dùng sử dụng để truy cập vào các trang web trên Internet. Thay vì phải nhớ địa chỉ IP phức tạp, người dùng có thể sử dụng tên miền dễ nhớ hơn để truy cập các dịch vụ trực tuyến.</p>
            <p>Ví dụ: Thay vì nhập địa chỉ IP như
                <code>192.168.1.1</code>, người dùng có thể sử dụng tên miền như <code>www.example.com</code> để truy cập vào cùng một dịch vụ.
            </p>
            <p>- Cấu trúc của một tên miền bao gồm hai phần chính: tên và đuôi. Tên miền có thể được chia thành nhiều cấp, ngăn cách bởi dấu chấm (.).</p>

            <h2>2/ React router là gì?</h2>
            <p>- React Router là một thư viện định tuyến (routing) phổ biến trong ứng dụng React, cho phép bạn quản lý điều hướng giữa các trang và thành phần trong ứng dụng một cách dễ dàng. Nó giúp tạo ra các URL thân thiện với người dùng và cung cấp khả năng chuyển đổi giữa các trang mà không cần tải lại toàn bộ trang web.</p>
            <p>- React Router cung cấp các thành phần như </p>
            <ul>
                <li><code>&lt;BrowserRouter&gt;</code>: Đóng gói toàn bộ ứng dụng và cung cấp khả năng định tuyến dựa trên URL.</li>
                <li><code>&lt;Route&gt;</code>: Xác định các tuyến đường (routes) và ánh xạ chúng với các thành phần cụ thể.</li>
                <li><code>&lt;Link&gt;</code>: Tạo liên kết điều hướng giữa các trang mà không làm tải lại trang.</li>
                <li><code>&lt;Switch&gt;</code>: Chỉ hiển thị thành phần đầu tiên khớp với URL hiện tại.</li>
            </ul>
            <p>- React Router giúp cải thiện trải nghiệm người dùng bằng cách tạo ra các ứng dụng đơn trang (SPA) mượt mà và nhanh chóng, đồng thời giữ cho URL của ứng dụng rõ ràng và dễ hiểu.</p>

            

        </div>
    );
};