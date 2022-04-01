import WalletBalance from '../components/WalletBalance';
import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import Posts from '../artifacts/contracts/Posts.sol/Posts.json';

const contractAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, Posts.abi, signer);

function Home() {
    const [getPosts, setPosts] = useState([])
    const [state, setstate] = useState({
        title: '',
        description: '',
    })

    const onChange = (e) => {
        setstate({ ...state, [e.target.id]: e.target.value })
    }

    const onClick = async () => {
        const connection = contract.connect(signer);
        const addr = connection.address;

        const result = await contract.createPost(state.title, state.description, {
            value: ethers.utils.parseEther('0.09'),
        });

        await result.wait();
        getCount()
    }

    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const posts = await contract.fetchPosts();
        setPosts(posts)
    };

    return (
        <div>
            <div className="container">
                <h1>UNCENSORED BLOG</h1>
                <WalletBalance />
                <div className="card my-3">

                    <div className="card-body">
                        <h5 className="card-title">Create New Post</h5>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" placeholder="xxxx" onChange={onChange} value={state.title} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="3" onChange={onChange} value={state.description}></textarea>
                        </div>
                        <button className="btn btn-primary mb-3" onClick={onClick}>
                            Post
                        </button>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">

                        <h5 className="card-title">Latest Post</h5>
                        <div className="list-group">
                            {getPosts.map((post) => (
                                <a href="#" key={parseInt(post.itemId)} className="list-group-item list-group-item-action">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{post.title}</h5>
                                    </div>
                                    <p className="mb-1">{post.description}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Home;