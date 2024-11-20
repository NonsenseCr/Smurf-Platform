import { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselComponent from '../components/Home/CarouselComics'; // Component cho carousel
import ComicList from '../components/Home/ComicsList'; // Component cho danh sách các bộ truyện
import RandomComic from '../components/Home/RandomComics'; // Component cho phần "Đọc Ngẫu Nhiên"

const Home = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/botruyen/active');
        const data = Array.isArray(response.data) ? response.data : [];
        setComics(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Unable to fetch data');
        setLoading(false);
      }
    }


    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <CarouselComponent comics={comics.slice(0, 10)} />
      <ComicList comics={comics} title="Mới Cập Nhật" />
      <RandomComic handleRandomSelect={() => console.log('Random comic')} />
    </div>
  );
};

export default Home;
