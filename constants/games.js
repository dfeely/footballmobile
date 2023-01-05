import axios from 'axios';

const getRandomId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * 
        (max - min + 1)) + min).toString();
};
// James 74441
// Conor 75596
const GamesData = () => {
    axios
        .get("https://footballresults.azurewebsites.net/api/games?code=hhsSD7SmNHc0dKHWxqRed9x7skC0LPNo4SlFtSiquYzgAzFuIf_o0Q==&teamId=75596&divisionId=6959&nada=" + 
            getRandomId(1, 200))
        .then((response) => {
            //console.log(JSON.stringify(response.data));
            var count = Object.keys(response.data).length;
        });
};

export { GamesData };