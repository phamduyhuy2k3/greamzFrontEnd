export default defineI18nConfig(() => ({
    legacy: false,
    locale: "en",

    messages: {
        en: {
            store: "Store",
            community: "Community",
            about: "About",
            support: "Support",
            footer1:
                "© 2023 Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.",
            footer2: "VAT included in all prices where applicable.   ",
            policy: "Privacy Policy",
            terms: "Terms of Use",
            legal: "Legal",
            cookie: "Cookies",
            refund: "Refunds",
            ssa: "Steam Subscriber Agreement",
            login: "Login",
            setting: "Setting",
            logout: "Logout",
            dashboard: "Dashboard",
            navbar:{
                home:"Home",
                store:"Store",
                categories: "Categories",
            },
            payment:{
                title:"Payment",
            },
            cart:{
                title:"Cart",
                yspc:"Your Shopping Cart",
            },
            dashBoardPage:{
                orders:{
                    title:"My Orders",
                    orderStatus: "Order Status",
                    orderTable:{
                        id:"Order ID",
                        total:"Total",
                        status:"Status",
                        method:"Payment Method",
                        create:"Created Date",

                    }
                },
                profile: {
                    title:"Profile",
                    profileTable:{
                        name:"Name",
                    }
                },
                gameLibrary:{
                    title:"Game Library",
                    gameTable:{
                        name:"Name",
                        price:"Price",

                    }
                }
            }
        },
        vi: {
            store: "Cửa hàng",
            community: "Cộng đồng",
            about: "Về chúng tôi",
            support: "Hỗ trợ",
            footer1:
                "© 2023 Valve Corporation. Bảo lưu mọi quyền. Tất cả các thương hiệu là tài sản của chủ sở hữu tương ứng tại Hoa Kỳ và các quốc gia khác.",
            footer2: "Giá đã bao gồm VAT (nếu có).   ",
            policy: "Chính sách bảo mật",
            terms: "Điều khoản sử dụng",
            legal: "Pháp lý",
            cookie: "Về Cookie",
            refund: "Hoàn tiền",
            ssa: "Thỏa thuận người dùng Steam",
            login: "Đăng nhập",
            setting: "Cài đặt",
            logout: "Đăng xuất",
            dashboard: "Bảng điều khiển",
            navbar:{
                home:"Trang chủ",
                store:"Cửa hàng",
                categories:"Thể loại",
            },
            cart:{
                title:"Giỏ hàng",
                yspc:"Giỏ hàng của bạn",
            },
            dashBoardPage:{
                orders:{
                    title:"Đơn hàng của bạn",
                    orderStatus: "Trạng thái đơn hàng",
                    orderTable:{
                        id:"Mã đơn hàng",
                        total:"Tổng tiền",
                        status:"Trạng thái",
                        method:"Phương thức thanh toán",
                        create:"Ngày tạo",
                    }
                },
                profile:{
                    title:"Thông tin cá nhân",

                },
                gameLibrary:{
                    title:"Thư viện game",
                    gameTable:{

                    }
                }
            },
            payment:{
                title:"Thanh toán",
            }


        },
       
    },
}));
