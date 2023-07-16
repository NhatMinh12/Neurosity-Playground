import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout({ neurosity, resetState }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (neurosity) {
        neurosity.logout().then(() => {
            resetState();
        });
        }
        navigate("/");
    }, [neurosity, resetState]);

  return null;
}