import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const History = () => {

  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    getHistory()
  }, [])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getHistory = async () => {
    const res = await fetch("http://localhost:8000/history", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  id: localStorage.getItem("id") 
                })
            })

            const data = await res.json()
            if (res.status === 422 || !data) {
                window.alert(data.message)
            } else {
                setHistoryData(data.historyData)
            }
  }

  return (
    <Wrapper>

      <div className='history'>
        {
          historyData.slice(0).reverse().map(history => {
            return (
              <div key={history._id}>
                <div className='history-image-section'>
                  <div className='txt'>Input Image</div>
                  <div className='txt'>{formatDate(history.createdAt)}</div>
                </div>
                <div className='history-image-section'>
                  <img src={history.input} alt='data not found' width="400px"/>
                  <img src={`data:image/jpeg;base64,${history.output_img1}`} alt='data not found' width="400px" />
                  <img src={`data:image/jpeg;base64,${history.output_img2}`} alt='data not found' width="400px"/>
                  <img src={`data:image/jpeg;base64,${history.output_img3}`} alt='data not found' width="400px"/>
                  </div>
                  <div className='history-image-bottom bottom-mg'>
                    <div></div>
                    <div className='txt2'>Img1</div>
                    <div className='txt2'>Img2</div>
                    <div className='txt2'>Img3</div>
                  </div>
              </div>
            )
          })
        } 
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`

background: #f1f1f1;

.history-image-bottom {
  display: flex;
  justify-content: space-around;
}

.bottom-mg {
  margin-bottom: 1.6rem;
}

.txt {
  font-weight: 700;
  font-size: 1.6rem;
  color: #0f0f31;
}

.txt2 {
  font-weight: 700;
  font-size: 1.1rem;
  color: #0f0f31;
}

img {
  border-radius: 8px;
  width: 332px;
  height: 250px;
}

h2 {
  color: #0f0f31;
  font-weight: 600;
}

.history {
  padding: 3rem 4.7rem;

  .history-image-section {
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 1500px) and (min-width: 355px) {
  .history {
    .history-image-section {
      flex-wrap: wrap;
      justify-content: center;
  
      img {
        margin: 0.7rem;
      }
    }
  }
}

@media screen and (max-width: 355px) and (min-width: 0px) {
  .history {
    .history-image-section {
      flex-wrap: wrap;
      justify-content: center;
  
      img {
        margin: 0.7rem;
        width: 93vw;
        height: 90%;
      }
    }
  }
  .history {
    padding: 0.8rem 2rem; 
  }
}

`;

export default History
