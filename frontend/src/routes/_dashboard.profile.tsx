import { createFileRoute } from "@tanstack/react-router";
import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { useState } from "react";

import {
    Pencil,
    Trash2,
    Plus,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute(
    "/_dashboard/profile"
)({
    component: ProfilePage,
});

interface Profile {
    id: string;
    full_name: string | null;
    email: string | null;
    phone: string | null;
}

function ProfilePage() {
    const queryClient = useQueryClient();

    const [editingId, setEditingId] =
        useState<string | null>(null);

    const [errors, setErrors] = useState({
        email: "",
        phone: "",
    });

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
    });

    // EMAIL VALIDATION
    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );
    };

    // PHONE VALIDATION
    const validatePhone = (phone: string) => {
        return /^[0-9+\-\s()]{7,20}$/.test(phone);
    };

    // FORM VALIDATION
    const validateForm = () => {
        const newErrors = {
            email: "",
            phone: "",
        };

        let isValid = true;

        if (!validateEmail(formData.email)) {
            newErrors.email =
                "Please enter a valid email address";
            isValid = false;
        }

        if (!validatePhone(formData.phone)) {
            newErrors.phone =
                "Please enter a valid phone number";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    // FETCH PROFILES
    const {
        data: profiles = [],
        isLoading,
    } = useQuery({
        queryKey: ["profiles"],

        queryFn: async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("created_at", {
                    ascending: false,
                });

            if (error) {
                throw error;
            }

            return data as Profile[];
        },
    });

    // CREATE PROFILE
    const createProfile = useMutation({
        mutationFn: async () => {
            if (!validateForm()) {
                return;
            }

            const { error } = await supabase
                .from("profiles")
                .insert([
                    {
                        full_name: formData.full_name,
                        email: formData.email,
                        phone: formData.phone,
                    },
                ]);

            if (error) {
                throw error;
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profiles"],
            });

            setFormData({
                full_name: "",
                email: "",
                phone: "",
            });
        },
    });

    // UPDATE PROFILE
    const updateProfile = useMutation({
        mutationFn: async () => {
            if (!validateForm() || !editingId) {
                return;
            }

            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: formData.full_name,
                    email: formData.email,
                    phone: formData.phone,
                })
                .eq("id", editingId);

            if (error) {
                throw error;
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profiles"],
            });

            setEditingId(null);

            setFormData({
                full_name: "",
                email: "",
                phone: "",
            });
        },
    });

    // DELETE PROFILE
    const deleteProfile = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("profiles")
                .delete()
                .eq("id", id);

            if (error) {
                throw error;
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profiles"],
            });
        },
    });

    // EDIT
    const handleEdit = (profile: Profile) => {
        setEditingId(profile.id);

        setFormData({
            full_name: profile.full_name || "",
            email: profile.email || "",
            phone: profile.phone || "",
        });
    };

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-display text-3xl">
                        Profiles
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Manage profile records.
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="rounded-xl border border-border bg-card/50 p-6">

                <div className="grid gap-4 md:grid-cols-3">

                    {/* Full Name */}
                    <Input
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                full_name: e.target.value,
                            })
                        }
                    />

                    {/* Email */}
                    <div>
                        <Input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <Input
                            type="tel"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                })
                            }
                        />

                        {errors.phone && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                </div>

                <div className="mt-5">

                    {editingId ? (
                        <Button
                            onClick={() =>
                                updateProfile.mutate()
                            }
                        >
                            Update Profile
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                createProfile.mutate()
                            }
                        >
                            <Plus className="mr-2 size-4" />
                            Create Profile
                        </Button>
                    )}

                </div>

            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-card/50 p-6">

                <h2 className="mb-5 text-xl font-semibold">
                    Profile Records
                </h2>

                {isLoading ? (
                    <p>Loading profiles...</p>
                ) : (
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Full Name
                                </TableHead>

                                <TableHead>
                                    Email
                                </TableHead>

                                <TableHead>
                                    Phone
                                </TableHead>

                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {profiles.map((profile) => (
                                <TableRow key={profile.id}>

                                    <TableCell>
                                        {profile.full_name}
                                    </TableCell>

                                    <TableCell>
                                        {profile.email}
                                    </TableCell>

                                    <TableCell>
                                        {profile.phone}
                                    </TableCell>

                                    <TableCell className="text-right">

                                        <div className="flex justify-end gap-2">

                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() =>
                                                    handleEdit(profile)
                                                }
                                            >
                                                <Pencil className="size-4" />
                                            </Button>

                                            <Button
                                                size="icon"
                                                variant="destructive"
                                                onClick={() =>
                                                    deleteProfile.mutate(
                                                        profile.id
                                                    )
                                                }
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>

                                        </div>

                                    </TableCell>

                                </TableRow>
                            ))}

                        </TableBody>

                    </Table>
                )}

            </div>

        </div>
    );
}