import NavBar from "../components/NavBar";
import VolunteerCard from "../components/VolunteerCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";


const AllVolunteerPosts = () => {

  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState()

  useEffect(() => {
    axios.get(`https://volunteer-management-server-beta.vercel.app/need-volunteer-posts?search=${search}`)
      .then(res => setData(res.data))
  }, [search])

  const handleSort = sortType => {
    setSort(sortType)

    if (sortType === 'volunteerNeeded') {
      fetch('https://volunteer-management-server-beta.vercel.app/need-volunteer-posts?volunteerNeeded=volunteersNeeded')
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
    }

    if (sortType === 'Deadline') {
      fetch('https://volunteer-management-server-beta.vercel.app/need-volunteer-posts?Deadline=deadline"')
        .then(res => res.json())
        .then(data => {
          setData(data)
        })
    }

  }

  return (
    <div className="mt-32">
      <Helmet>
        <title>Need VolunteerPost</title>
      </Helmet>
      <header>
        <NavBar />
      </header>
      <section className="flex justify-center gap-2 md:my-4 mt-10 px-4">
        <input onChange={e => setSearch(e.target.value)} type="text" placeholder="Type here" className="input input-bordered rounded-none w-full max-w-xs" />   <details className="dropdown ">
          <summary className="btn text-xs  md:text-base bg-blue-600 text-white hover:bg-blue-300 rounded-none m-1">{sort ? sort : "Sort By"}</summary>
          <ul className="menu dropdown-content bg-blue-600 text-white rounded-none z-[1] w-52 p-2 shadow">
            <li onClick={() => handleSort('volunteerNeeded')}><a>volunteerNeeded</a></li>
            <li onClick={() => handleSort('Deadline')}><a>Deadline</a></li>
          </ul>
        </details>
      </section>
      <main className="grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-10 place-items-center xl:w-9/12 w-11/12 mx-auto mt-20 mb-24">
        {
          data.map(post => <VolunteerCard key={post._id} post={post}></VolunteerCard>)
        }
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AllVolunteerPosts;