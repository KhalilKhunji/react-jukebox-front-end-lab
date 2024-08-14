const BASE_URL=`${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL);
        return res.json();
    } catch (error) {
        console.log(error);
    };
};

export { index }