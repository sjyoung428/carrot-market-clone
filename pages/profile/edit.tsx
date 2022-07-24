import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import useUser from "@libs/client/hooks/useUser";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/hooks/useMutation";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();

  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponse>("/api/users/me");

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
  }, [user, setValue]);

  useEffect(() => {
    if (data && !data.ok) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);

  const onValid = ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "이메일 또는 전화번호가 필수입니다.",
      });
    }
    editProfile({ email, phone, name });
  };
  const [avatarPreview, setAvartarPreview] = useState("");
  let avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar.length) {
      const file = avatar[0];
      setAvartarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-14 w-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="mt-2 block text-center font-bold text-red-500 ">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button
          onClick={() => clearErrors()}
          text={loading ? "Loading..." : "Update profile"}
        />
      </form>
    </Layout>
  );
};

export default EditProfile;
