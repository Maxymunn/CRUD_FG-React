import { TableData } from "../../types/types";
import { useLayoutEffect, useState } from "react";

interface TableProps {
  data: TableData[];
}
const Table = (props: TableProps) => {
  const { data } = props;
  const [users, setUsers] = useState<TableData[]>(data);
  const url = "http://localhost:3000/";

  useLayoutEffect(() => {
    setUsers(data);
  }, [data, setUsers]);

  const handleDelete = (e: any, data: TableData) => {
    e.preventDefault();
    const next = confirm(
      `tem certeza que deseja excluir o registro do ${data.first_name} ${data.last_name}?`
    );
    next
      ? fetch(`${url}registers/${data.id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.status === 200) {
            fetch(url + "registers", {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            })
              .then((res) => {
                return res.json();
              })
              .then((result) => {
                setUsers(result);
              });
          }
        })
      : null;
  };

  const handleFilter = (e: any) => {
    const searchString: string = e.target.value.toLowerCase();
    if (e.target.value) {
      let newUsers: TableData[] = [];
      data.map((user) => {
        if (user.first_name.toLowerCase().indexOf(searchString) >= 0) {
          newUsers.push(user);
        }
      });
      setUsers(newUsers);
    } else {
      setUsers(data);
    }
  };

  return (
    <>
      <input
        type="text"
        id="filter"
        placeholder="buscar"
        onChange={handleFilter}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Register on</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((each, index) => {
            return (
              <tr key={index}>
                <td>{each.id}</td>
                <td>{each.first_name}</td>
                <td>{each.last_name}</td>
                <td>{each.register_on}</td>
                <td>
                  <a href={`edit/${each.id}`}>O</a>
                </td>
                <td>
                  <button onClick={(e) => handleDelete(e, each)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
