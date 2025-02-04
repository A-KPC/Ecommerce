
import { useNavigate } from "react-router-dom";


const BackButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/')
    }

    return (
        <button
            onClick={handleBack}
            className="bg-transparent hover:bg-orange-100 text-yellow-400 font-semibold py-2 px-6 rounded-lg mb-8 border-2 border-yellow-500 transition-colors"
        >
            Back to Home
        </button>
    )
}

export default BackButton