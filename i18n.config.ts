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
            signIn: "Sign in",
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
            signIn: "Đăng nhập",
            alertRegister: {
                success: "Đăng ký thành công",
                error: "Đăng ký thất bại",

            },
            alertLogin: {
                success: "Đăng nhập thành công",
                error: "Đăng nhập thất bại",

            }
        },
        fr: {
            store: "Magasin",
            community: "Communauté",
            about: "À propos",
            support: "Soutien",
        },
        cn: {
            store: "商店",
            community: "社区",
            about: "关于",
            support: "支持",
        },
        jp: {
            store: "店",
            community: "コミュニティ",
            about: "約",
            support: "サポート",
        },
    },
}));
