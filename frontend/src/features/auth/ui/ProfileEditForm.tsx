// frontend/src/features/profile/ui/ProfileEditForm.tsx
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useForm, Controller } from "react-hook-form";

interface ProfileEditFormProps {
    defaultValues: {
        name: string;
        bio: string;
        avatar?: FileList; // Thêm avatar vào defaultValues
    };
    onSubmit: (data: { name: string; bio: string; avatar?: FileList }) => void;
    isLoading: boolean;
    error: string | null;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
    defaultValues,
    onSubmit,
    isLoading,
    error,
}) => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues, // Đảm bảo defaultValues có avatar
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setValue("avatar", files); // Gán avatar với e.target.files nếu không phải null
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <div>
                <label htmlFor="name" className="block font-medium">Tên</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required" }}
                    render={({ field }) => <Input {...field} id="name" disabled={isLoading} />}
                />
                {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
            </div>

            {/* Bio Input */}
            <div>
                <label htmlFor="bio" className="block font-medium">Giới thiệu</label>
                <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => <Input {...field} id="bio" disabled={isLoading} />}
                />
            </div>

            {/* Avatar Input */}
            <div>
                <label htmlFor="avatar" className="block font-medium">Ảnh đại diện</label>
                <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleFileChange} // Gọi handleFileChange thay vì trực tiếp setValue
                    disabled={isLoading}
                />
            </div>

            {/* Error message */}
            {error && <div className="text-sm text-red-500">{error}</div>}

            {/* Submit Button */}
            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
        </form>
    );
};

export default ProfileEditForm;
