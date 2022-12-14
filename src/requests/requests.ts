class request {
  url = "http://localhost:3000/";

  getRegistros = () => {
    fetch(this.url + "registers", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

  getRegistrosById = (id: number) => {
    fetch(`${this.url}registers/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };
}
export default request;
