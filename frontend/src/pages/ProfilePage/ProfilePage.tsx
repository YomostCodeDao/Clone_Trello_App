// frontend/src/pages/ProfilePage/ProfilePage.tsx
import { useEffect, useState } from "react"
import { apiFactory, API_ENDPOINTS } from "@/shared/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Avatar } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import type { User } from "@/shared/types"
import { useNavigate } from "react-router-dom"

export const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await apiFactory.get(API_ENDPOINTS.AUTH.ME)
                setUser(response.data)
            } catch (err) {
                console.error("Failed to fetch user profile", err)
            }
        }

        fetchUser()
    }, [])

    if (!user) {
        return <p className="text-center mt-10">Loading profile...</p>
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Avatar src={user.avatarUrl} alt={user.name} />
                    <div className="text-center">
                        <p className="text-xl font-semibold">{user.name}</p>
                        <p className="text-muted-foreground">{user.email}</p>
                        {user.bio && <p className="mt-2 text-sm italic">{user.bio}</p>}
                    </div>

                    {/* Nút sửa profile */}
                    <Button
                        className="mt-4"
                        onClick={() => navigate("/profile/edit")}
                    >
                        Sửa Profile
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
