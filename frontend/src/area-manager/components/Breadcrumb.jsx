import "@/area-manager/styles/breadcrumb.css"; // Import CSS
import logoFull from "@/assets/arrow.png";

const Breadcrumb = ({ paths }) => {
  return (
    <div className="breadcrumb-container">
      {paths.map((path, index) => (
        <div className="breadcrumb-item" key={index}>
          {typeof path === "string" ? (
            path.toUpperCase() // Nếu là chuỗi, chuyển thành chữ in hoa
          ) : (
            path // Nếu không phải chuỗi, hiển thị trực tiếp (ví dụ: Link)
          )}
          {index < paths.length - 1 && (
            <img
              src={logoFull}
              alt="Arrow"
              className="breadcrumb-arrow"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
