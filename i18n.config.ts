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
            login: {
                title: "Login",
                username: "Sign in with your username or email",
                password: "Password",
            },
            setting: "Setting",
            logout: "Logout",
            dashboard: "Dashboard",
            navbar: {
                home: "Home",
                store: "Store",
                categories: "Categories",
            },
            payment: {
                title: "Payment",
            },
            cart: {
                title: "Cart",
                yspc: "Your Shopping Cart",
            },
            dashBoardPage: {
                orders: {
                    title: "My Orders",
                    orderStatus: "Order Status",
                    orderTable: {
                        id: "Order ID",
                        total: "Total",
                        status: "Status",
                        method: "Payment Method",
                        create: "Created Date",

                    }
                },
                profile: {
                    title: "Profile",
                    profileTable: {
                        name: "Name",
                    }
                },
                gameLibrary: {
                    title: "Game Library",
                    gameTable: {
                        name: "Name",
                        price: "Price",

                    }
                }
            },

            register: {
                title: "Register",
                validate: {
                    require: {
                        username: "Username is required",
                        password: "Password is required",
                        email: "Email is required",
                        fullname: "Fullname is required",
                        confirmPassword: "Confirm password is required",
                    },
                    minLength: {
                        username: "Username must be between 6 and 18 characters",
                        password: "The password must be between 6 and 18 characters",
                    },
                    maxLength: {
                        password: "The password must be between 6 and 18 characters",
                        username: "Username must be between 6 and 18 characters",
                    },
                    oneNumber: {
                        password: "Password must contain at least one number",
                    },
                    oneSpecialCharacter: {
                        password: "Password must contain at least one special character",
                    },
                    oneUpperCase: {
                        password: "Password must contain at least one uppercase letter",
                    },
                    sameAs: {
                        confirmPassword: "Confirm password must be same as password",
                    },
                    otp: "Invalid codes",
                    username: {
                        isExisted: "Username is existed",
                    },
                    email: {
                        isExisted: "Email is existed",
                        invalidFormat: "Email is invalid",
                    }
                }
            },
            profile: {
                title: "Profile",
                security: {
                    title: "Account security",
                    changePassword: {
                        title: "Change your password",
                        label: {
                            currentPassword: "Current password",
                            newPassword: "New password",
                            confirmPassword: "Confirm password",
                        },
                        validate: {
                            require: {
                                oldPassword: "Old password is required",
                                newPassword: "New password is required",
                                confirmPassword: "Confirm password is required",
                            },
                            minLength: {
                                newPassword: "The password must be between 6 and 18 characters",

                            },
                            maxLength: {
                                newPassword: "The password must be between 6 and 18 characters",
                            },
                            sameAs: {
                                confirmPassword: "Confirm password must be same as new password",
                            }
                        },
                        alert: {
                            success: "Change password successfully",
                            error: "Change password failed",
                        }
                    },
                    changeEmail: {
                        title: "Change your email",
                        label: {
                            currentPassword: "Current password",
                            newEmail: "New email",
                            confirmNewEmail: "Confirm email",
                        },
                        validate: {
                            require: {
                                currentPassword: "Old password is required",
                                newEmail: "New email is required",
                                confirmNewEmail: "Confirm email is required",
                            },
                            sameAs: {
                                confirmNewEmail: "Confirm email must be same as new email",
                            },
                            email: {
                                invalidFormat: "Email is invalid",
                            }
                        },
                        alert: {
                            success: "Change email successfully",
                            error: "Change email failed",
                            otp:{
                                success: "Verify code successfully",
                                error: "Verify code failed",
                                sendFailed: "Send verify code failed",
                                sendSuccess: "Send verify code successfully",
                            }
                        }
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
            login: {
                title: "Đăng nhập",
                username: "Đăng nhập bằng tên đăng nhập hoặc email",
                password: "Mật khẩu",
            },
            setting: "Cài đặt",
            logout: "Đăng xuất",
            dashboard: "Bảng điều khiển",
            navbar: {
                home: "Trang chủ",
                store: "Cửa hàng",
                categories: "Thể loại",
            },
            cart: {
                title: "Giỏ hàng",
                yspc: "Giỏ hàng của bạn",
            },
            dashBoardPage: {
                orders: {
                    title: "Đơn hàng của bạn",
                    orderStatus: "Trạng thái đơn hàng",
                    orderTable: {
                        id: "Mã đơn hàng",
                        total: "Tổng tiền",
                        status: "Trạng thái",
                        method: "Phương thức thanh toán",
                        create: "Ngày tạo",
                    }
                },
                profile: {
                    title: "Thông tin cá nhân",

                },
                gameLibrary: {
                    title: "Thư viện game",
                    gameTable: {}
                }
            },
            payment: {
                title: "Thanh toán",
            },
            register: {
                title: "Đăng ký",
                validate: {
                    require: {
                        username: "Tên đăng nhập là bắt buộc",
                        password: "Mật khẩu là bắt buộc",
                        email: "Email là bắt buộc",
                        fullname: "Họ tên là bắt buộc",
                        confirmPassword: "Xác nhận mật khẩu là bắt buộc",
                    },
                    minLength: {
                        username: "Tên đăng nhập phải có ít nhất 6 ký tự",
                        password: "Mật khẩu phải có từ 6 đến 18 ký tự",
                    },
                    maxLength: {
                        password: "Mật khẩu phải có từ 6 đến 18 ký tự",

                    },
                    oneNumber: {
                        password: "Mật khẩu phải chứa ít nhất một số",
                    },
                    oneSpecialCharacter: {
                        password: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt",
                    },
                    oneUpperCase: {
                        password: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa",
                    },
                    sameAs: {
                        confirmPassword: "Xác nhận mật khẩu phải giống như mật khẩu",
                    },
                    otp: "Mã xác thực không hợp lệ",
                    username: {
                        isExisted: "Tên đăng nhập đã tồn tại",
                    },
                    email: {
                        isExisted: "Email đã tồn tại",
                        invalidFormat: "Email không hợp lệ",
                    }
                },

            },
            profile: {
                title: "Thông tin cá nhân",
                security: {
                    title: "Bảo mật tài khoản",
                    changePassword: {
                        title: "Thay đổi mật khẩu",
                        label: {
                            currentPassword: "Mật khẩu hiện tại",
                            newPassword: "Mật khẩu mới",
                            confirmPassword: "Xác nhận mật khẩu",

                        },
                        validate: {
                            require: {
                                oldPassword: "Mật khẩu cũ là bắt buộc",
                                newPassword: "Mật khẩu mới là bắt buộc",
                                confirmPassword: "Xác nhận mật khẩu là bắt buộc",
                            },
                            minLength: {
                                newPassword: "Mật khẩu phải có từ 6 đến 18 ký tự",

                            },
                            maxLength: {
                                newPassword: "Mật khẩu phải có từ 6 đến 18 ký tự",
                            },
                            sameAs: {
                                confirmPassword: "Xác nhận mật khẩu phải giống như mật khẩu",
                            }
                        },
                        alert: {
                            success: "Thay đổi mật khẩu thành công",
                            error: "Thay đổi mật khẩu thất bại",
                        }
                    },
                    changeEmail: {
                        title: "Thay đổi email",
                        label: {
                            currentPassword: "Mật khẩu hiện tại",
                            newEmail: "Email mới",
                            confirmNewEmail: "Xác nhận email mới",
                        },
                        validate: {
                            require: {
                                currentPassword: "Mật khẩu cũ là bắt buộc",
                                newEmail: "Email mới là bắt buộc",
                                confirmNewEmail: "Xác nhận email mới là bắt buộc",
                            },
                            sameAs: {
                                confirmNewEmail: "Xác nhận email phải giống như email mới",
                            },
                            email: {
                                invalidFormat: "Email không hợp lệ",
                            }
                        },
                        alert: {
                            success: "Thay đổi email thành công",
                            error: "Thay đổi email thất bại",
                            otp:{
                                success: "Mã xác thực chính xác",
                                error: "Mã xác thực không chính xác",
                                sendFailed: "Gửi mã xác thực thất bại",
                                sendSuccess: "Gửi mã xác thực thành công",
                            }
                        }
                    }
                }
            }

        },

    },
}));
