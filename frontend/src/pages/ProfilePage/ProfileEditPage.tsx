// frontend/src/pages/ProfilePage/ProfileEditPage.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { useProfileEdit } from "@/hooks/useProfileEdit";
import ProfileEditForm from "@/features/auth/ui/ProfileEditForm";

export const ProfileEditPage = () => {
    const { updateProfile, isLoading, error, user } = useProfileEdit();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sửa thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProfileEditForm
                        defaultValues={{ name: user?.name ?? "", bio: user?.bio ?? "" }}
                        onSubmit={updateProfile}
                        isLoading={isLoading}
                        error={error}
                    />
                </CardContent>
            </Card>
        </div>
    );
};
