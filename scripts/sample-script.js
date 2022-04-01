const hre = require("hardhat");

async function main() {

    const Posts = await hre.ethers.getContractFactory("Posts");
    const posts = await Posts.deploy();

    await posts.deployed();

    console.log("deployed to:", posts.address);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });