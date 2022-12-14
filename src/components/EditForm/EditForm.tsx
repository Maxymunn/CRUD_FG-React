import { useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { TableData } from "../../types/types";
import { redirect } from "react-router-dom";

import "./EditForm.css";

function EditForm() {
  const params = useParams();
  const [user, setUser] = useState<TableData>({
    id: 0,
    first_name: "",
    last_name: "",
    register_on: "",
  });
  const url = "http://localhost:3000/";

  useLayoutEffect(() => {
    fetch(`${url}registers/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setUser(result));
  }, [params]);

  const editValue = (e: any) => {
    const { name, value } = e.target;
    setUser(
      (prev) =>
        ({
          ...prev,
          [name]: value,
          register_on: new Date().toLocaleDateString("pt-br"),
        } as TableData)
    );
  };

  const submitChange = (e: any) => {
    e.preventDefault();
    if (!user.first_name || !user.last_name) {
      return alert(`Existem valores não preenchidos!`);
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const form = JSON.stringify({
      id: 21,
      first_name: user.first_name,
      last_name: user.last_name,
      register_on: user.register_on,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: form,
      redirect: "follow",
    } as RequestInit;

    fetch(`${url}registers/${user.id}`, requestOptions)
      .then((res) => {
        if (res.status !== 200) res;
      })
      .then((result) => console.log(result));
    return redirect("/");
  };

  return (
    <form action="" onSubmit={submitChange}>
      <input type="hidden" value={user.id} />
      <label htmlFor="first_name">
        First name:
        <input
          type="text"
          id="first_name"
          name="first_name"
          onChange={editValue}
          value={user.first_name}
        />
      </label>
      <label htmlFor="last_name">
        Last name:
        <input
          type="text"
          id="last_name"
          name="last_name"
          onChange={editValue}
          value={user.last_name}
        />
      </label>
      <label>
        Register on:
        <span id="register_on">{user.register_on}</span>
      </label>
      <a href="/">Voltar</a>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default EditForm;
