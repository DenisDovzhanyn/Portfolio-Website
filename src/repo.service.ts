

export async function getReposFromS3() {
    const jsonObject = await fetch('https://repofromlambda.s3.amazonaws.com/repo-data.json', {
    });

    return await jsonObject.json();
    
}
