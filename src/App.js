import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from "react";

function queryMember() {
  const ajax = fetch("http://localhost/member_backend/public/api/member", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });

  return ajax
};


function App() {

  const [allData, setAllData] = useState([]);
  const [getData, setGetData] = useState(true)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    queryMember().then((data) => {
      setAllData(data);
      console.log(data)
    }).then(() => {
      setGetData(false);
    });
  }, []);



  const changeName = (value, index) => {
    const newData = [...allData];
    newData[index].name = value;
    setAllData(newData);
  }

  const changeEmail = (value, index) => {
    const newData = [...allData];
    newData[index].email = value;
    setAllData(newData);
  }





  const addMember = () => {

    fetch("http://localhost/member_backend/public/api/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then((response) => {
      queryMember().then((data) => {
        setAllData(data);
        console.log(data)
      }).then(() => {
        setGetData(false);
      });
      return response.json();
    });
  };

  const deleteMember = (id) => {
    fetch(`http://localhost/member_backend/public/api/member/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      queryMember().then((data) => {
        setAllData(data);
        console.log(data)
      }).then(() => {
        setGetData(false);
      });
      console.log(response);
    });
    console.log(`${id}`);
  };

  function updateMember(userid, index) {

    fetch(`http://localhost/member_backend/public/api/member/33`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: allData[index].name,
        email: allData[index].email
      })
    }).then((response) => {
      console.log(response);
    });

    console.log(`${userid}`);
  };

  if (getData) {
    return (
      <span>Loading...</span>
    );
  }

  return (
    <Container>
      <Table bordered hover>
        <thead>
          <tr>
            <th>姓名</th>
            <th>電子信箱</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            allData.map((member, i) => {
              return (
                <tr key={i}>
                  <td><Form.Control type="text" value={member.name} onChange={(event) => { changeName(event.target.value, i) }} /></td>
                  <td><Form.Control type="email" placeholder="xxx@email" value={member.email} onChange={(event) => { changeEmail(event.target.value, i) }} /></td>
                  <td><Button className='ms-5' onClick={() => { deleteMember(member.userid) }} variant="outline-primary">刪除</Button>
                    <Button className='ms-5' onClick={() => { updateMember(member.userid, i) }} variant="outline-primary">修改</Button></td>
                </tr>
              )
            })

          }
          <tr>
            <td>
              <Form.Control type="text" onChange={(event) => { setName(event.target.value) }} />
            </td>
            <td>
              <Form.Control type="email" placeholder="xxx@email" onChange={(event) => { setEmail(event.target.value) }} />
            </td>
            <td><Button className='ms-5' onClick={addMember}
              variant="outline-primary">新增</Button></td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
