// frontend/src/pages/HomePage/HomePage.tsx
export const HomePage = () => {
  return <div>
    <div>1. Mô tả cách trình duyệt hoạt động từ lúc bạn truy cập vào một website bất kỳ cho đến lúc có thể tương tác được với website đó?</div>
    <p>Khi truy cập vào một website, trình duyệt sẽ thực hiện các bước sau:
      <ol>
        <li>HTTP Request: Gửi yêu cầu HTTP (GET, POST, v.v.) tới máy chủ để lấy tài nguyên (HTML, CSS, JS, hình ảnh, v.v.).</li>
        <li>Server Response: Máy chủ xử lý yêu cầu và gửi phản hồi chứa tài nguyên về trình duyệt.</li>
        <li>Rendering: Trình duyệt phân tích cú pháp HTML, xây dựng DOM tree, áp dụng CSS để tạo CSSOM, và thực thi JavaScript để tạo ra trang web hoàn chỉnh.</li>
        <li>Interactivity: Khi trang web đã được tải xong, trình duyệt cho phép người dùng tương tác với các phần tử trên trang.</li>
      </ol>
    </p>
    <div className="mt-3">2. Chuyện gì xảy ra khi truy cập vào một trang bất kỳ (với CSR và SSR)?</div>
    <p>Với CSR (Client-Side Rendering):
      <ol>
        <li>Trình duyệt tải một trang HTML cơ bản từ máy chủ.</li>
        <li>JavaScript được tải và thực thi trên trình duyệt, tạo ra nội dung trang web động.</li>
      </ol>
    Với SSR (Server-Side Rendering):
      <ol>
        <li>Máy chủ tạo ra trang HTML hoàn chỉnh và gửi nó về trình duyệt.</li>
        <li>Trình duyệt hiển thị nội dung ngay lập tức, sau đó tải JavaScript để thêm tính năng tương tác.</li>
      </ol>
    </p>
    
    <div className="mt-3">3. Chuyện gì xảy ra khi chuyển trang (với CSR và SSR)?</div>
    <p>Với CSR (Client-Side Rendering):
      <ol>
        <li>Trình duyệt sẽ gửi yêu cầu tới máy chủ để lấy dữ liệu cần thiết cho trang mới.</li>
        <li>JavaScript sẽ xử lý dữ liệu và cập nhật nội dung trang mà không cần tải lại toàn bộ trang.</li>
      </ol>
    Với SSR (Server-Side Rendering):
      <ol>
        <li>Trình duyệt gửi yêu cầu tới máy chủ để lấy trang HTML mới.</li>
        <li>Máy chủ xử lý yêu cầu và gửi lại trang HTML hoàn chỉnh.</li>
      </ol>
    </p>

    <div className="mt-3">4. Kỹ thuật render hydrate là gì?</div>
    <p>Kỹ thuật render hydrate là quá trình mà trong đó, sau khi một trang web đã được render trên máy chủ và gửi tới trình duyệt, JavaScript sẽ "kích hoạt" các phần tử trên trang để chúng có thể tương tác được. Điều này cho phép trang web có hiệu suất tốt hơn và cải thiện trải nghiệm người dùng.</p>

    <div className="mt-3">5. loader trong react router hoạt động như thế nào?</div>
    <p>Loader trong React Router là một hàm được gọi trước khi một route được render. Nó cho phép bạn thực hiện các tác vụ bất đồng bộ, như lấy dữ liệu từ API, và đợi cho đến khi các tác vụ này hoàn thành trước khi hiển thị component. Điều này giúp đảm bảo rằng dữ liệu cần thiết đã sẵn sàng trước khi người dùng thấy trang.</p>

    <div className="mt-3">6. Lazyload là gì?</div>
    <p>Lazyload là kỹ thuật trì hoãn việc tải các tài nguyên không cần thiết ngay lập tức khi trang web được tải. Thay vào đó, các tài nguyên này chỉ được tải khi người dùng cần đến chúng, ví dụ như khi cuộn trang đến một phần cụ thể hoặc khi người dùng tương tác với một phần tử. Điều này giúp cải thiện hiệu suất tải trang và giảm thiểu việc sử dụng băng thông.</p>
  </div>;
};