async function seed() {
    //TODO seed from SIS
}

seed().then(() => {
    console.log("Done seeding.");
    process.exit();
});