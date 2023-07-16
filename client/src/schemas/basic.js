import * as Yup from 'yup';

export const basicSchema = Yup.object({
    name: Yup.string().min(2, 'Tên cần có ít nhất 2 chữ cái').required('Vui lòng không bỏ trống'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng không bỏ trống'),
    password: Yup.string()
        .min(8, 'Mật khẩu cần ít nhất 8 ký tự')
        .required('Vui lòng không bỏ trống'),
});

export const loginSchema = Yup.object({
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng không bỏ trống'),
    password: Yup.string().required('Vui lòng không bỏ trống'),
});
