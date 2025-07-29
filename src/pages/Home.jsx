import React from 'react';
import { useSelector } from 'react-redux';
import {
  Star,
  Award,
  Users,
  Truck,
  Shield,
  Palette,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import CustomSlider from '../components/slider/Slider';
import images from '../data/ImageSlider';
import ProductGrid from '../components/slider/ProductGrid';
import ProductGrid2 from '../components/slider/ProductGrid2';
import FeedbackSlider from '../components/slider/Slider2';
import FloatingContactButtons from '../components/FloatingContactButtons ';

const Home = () => {
  const products = useSelector((state) => state.products);

  const features = [
    {
      icon: Palette,
      title: "Thiết kế chuyên nghiệp",
      description: "Đội ngũ thiết kế giàu kinh nghiệm, tạo ra những mẫu decal độc đáo và ấn tượng"
    },
    {
      icon: Shield,
      title: "Chất lượng đảm bảo",
      description: "Sử dụng vật liệu cao cấp, độ bền màu và độ dính tốt, chống nước và tia UV"
    },
    {
      icon: Truck,
      title: "Giao hàng nhanh chóng",
      description: "Dịch vụ giao hàng toàn quốc, đảm bảo thời gian và an toàn cho sản phẩm"
    },
    {
      icon: Users,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ tư vấn chuyên nghiệp, sẵn sàng hỗ trợ khách hàng mọi lúc"
    }
  ];

  const stats = [
    { number: "1000+", label: "Khách hàng hài lòng" },
    { number: "5000+", label: "Sản phẩm đã bán" },
    { number: "50+", label: "Mẫu thiết kế độc quyền" },
    { number: "5+", label: "Năm kinh nghiệm" }
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Chủ xe tải",
      content: "Decal chất lượng rất tốt, màu sắc đẹp và bền. Dịch vụ tư vấn rất chuyên nghiệp!",
      rating: 5
    },
    {
      name: "Trần Thị B",
      role: "Chủ xe máy",
      content: "Thiết kế đẹp, giá cả hợp lý. Sẽ ủng hộ shop dài dài!",
      rating: 5
    },
    {
      name: "Lê Văn C",
      role: "Chủ xe ô tô",
      content: "Chất lượng sản phẩm vượt trội, đội ngũ nhân viên nhiệt tình và chuyên nghiệp.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <CustomSlider>
          {images.map((image, index) => (
            <img key={index} src={image.imgURL} alt={image.imgAlt} className="w-full h-[600px] object-cover" />
          ))}
        </CustomSlider>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              DecalPro
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in">
              Chúng tôi lưu giữ kỷ niệm của bạn trên những miếng decal chất lượng cao
            </p>
            <div className="animate-fade-in">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg">
                Khám phá ngay
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn DecalPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết mang đến những sản phẩm decal chất lượng cao với dịch vụ chuyên nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center text-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá bộ sưu tập decal đa dạng, phù hợp với mọi loại phương tiện
            </p>
          </div>

          <div className="animate-fade-in">
            <ProductGrid />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Dịch vụ sản xuất decal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Potato Decal thiết kế và sản xuất nhiều loại sản phẩm decal thẩm mỹ, chất lượng cao
            </p>
          </div>

          <div className="animate-fade-in">
            <ProductGrid2 />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Khách hàng nói gì về chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những đánh giá chân thực từ khách hàng đã sử dụng dịch vụ của chúng tôi
            </p>
          </div>

          <div className="animate-fade-in">
            <FeedbackSlider />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">
              Sẵn sàng tạo nên sự khác biệt?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Hãy để chúng tôi giúp bạn tạo ra những thiết kế decal độc đáo và chuyên nghiệp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg flex items-center justify-center">
                Liên hệ ngay
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                Xem bảng giá
              </button>
            </div>
          </div>
        </div>
      </section>

      <FloatingContactButtons />
    </div>
  );
};

export default Home;

