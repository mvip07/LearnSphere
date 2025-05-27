import { useRouter } from "next/navigation";

const RouterLoginPage = () => {
    const router = useRouter();

    const handleLoginRedirect = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/auth/login");
    };

    return handleLoginRedirect
};

export default RouterLoginPage;
