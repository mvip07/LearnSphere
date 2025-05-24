"use client";
import Loader from "../../components/Loader";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import GoogleAuthButton from "@/services/googleAuth/GoogleAuthButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoToNextPage } from "@/hooks/useGoToNextPage";


export default function Register() {
    const goTo = useGoToNextPage()
    const { fields, handleInputChange, registerSubmit, validOrInvalid, loading, passwordVisible, togglePasswordVisibility } = useRegister();
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <div className="w-full h-full overflow-auto scroll-bar-none">
                <form onSubmit={registerSubmit}>
                    <h2 className="font-bold text-[var(--dark)] dark:text-[var(--whi)] text-[22px] md:text-[28px] text-start leading-[24px] md:leading-[36px]">
                        Create Your Account
                    </h2>
                    <div className="form-input">
                        {
                            fields.map((field, index) => (
                                <div className="form-group my-4" key={index}>
                                    <label className="text-[16px] text-[var(--dark)] dark:text-[var(--whi)] font-medium capitalize mb-2.5 inline-block" htmlFor={field.name}>{field.name}</label>
                                    <div className="relative">
                                        <input
                                            id={field.name}
                                            name={field.name}
                                            onChange={handleInputChange}
                                            className="w-full input outline-0"
                                            placeholder={`Enter your ${field.name}`}
                                            type={passwordVisible.visible === field.name && passwordVisible.active ? "text" : field.type}
                                        />
                                        {
                                            (field.name === "password" || field.name === "confirmPassword") && (
                                                <span onClick={() => togglePasswordVisibility(field.name)} className="">
                                                    {
                                                        passwordVisible.visible === field.name && passwordVisible.active ? (
                                                            <EyeIcon className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] absolute inset-y-2/4 translate-y-[-50%] end-[20px] cursor-pointer opacity-50" />
                                                        ) : (
                                                            <EyeSlashIcon className="size-5 text-[var(--textCl)] dark:text-[var(--darkTextCl)] absolute inset-y-2/4 translate-y-[-50%] end-[20px] cursor-pointer opacity-50" />
                                                        )
                                                    }
                                                </span>
                                            )
                                        }
                                    </div>
                                    {
                                        validOrInvalid[field.name] && validOrInvalid[field.name].map((errorMsg, idx) => (
                                            <p key={idx} className="text-[13px] text-[var(--error)] font-medium capitalize mt-1 inline-block">{errorMsg}.</p>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="my-6">
                        <button type="submit" disabled={loading}
                            className="w-full flex items-center justify-center gap-5 rounded-lg py-2 md:py-3 outline-0 text-[var(--whi)] text-[16px] font-medium leading-normal bg-[var(--primary)]">
                            {loading ? <Loader style={{ background: 'var(--whi)', width: '20px', padding: '3px' }} /> : "Create account"}
                        </button>
                    </div>

                    <div className="my-6 text-center">
                        <p className="font-normal text-[16px] text-[var(--textCl)] dark:text-[var(--darkTextCl)] leading-normal">
                            Already have an account?
                            <span onClick={() => goTo("/auth/login")} className="font-normal text-[16px] text-[var(--primary)] leading-normal capitilize ms-2 cursor-pointer">Sign In</span>
                        </p>
                    </div>
                </form>
                <GoogleAuthButton title="Sign up with Google" />
            </div>
        </GoogleOAuthProvider>
    );
}
