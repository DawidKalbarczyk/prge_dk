import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

function Services(props) {
    return (
        <div>
            <div>Services</div>
            <Button
                className="services__button"
                variant="contained"
                size="large"
                component={Link}
                to='/map'>Przejdź do mapy</Button>
        </div>
    );
}

export default Services;