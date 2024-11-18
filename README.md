## To Do

paginate album should not request album data again when changing pages, only photo data
pagination
Toast for errors
tests
ci/cd
show all metadata for current batch

```bash
clean classes in
const imgClasses = isLoading
? "justify-items-center object-cover"
: "justify-items-center border-2 border-solid border-indigo-600 object-cover";
```

Other routes send to home
Hosting
change pages directory
use API_URL from constants
use the same function schema for all get endpoints
style spacing in photodata
move filtering functions out of MainWrapper
move HandleAlbumTitleChangeParams to common params
handle total pages in pagination
explain why i used nextjs
explain why the pagination doesnt get all the data
add api types to api responses
handle all empty fitlers in a single place
```bash
use single function to make api requests
      const response = await fetch(
        `/api/photos?start=${(currentPage - 1) * 25}`,
      );
```
set to first page on filter change
```bash
use single function to parse URLSearchParams
    const params = new URLSearchParams({
      ...(start ? { _start: String(start) } : { _start: "0" }),
      ...(limit ? { _limit: String(limit) } : { _limit: "25" }),
      ...(email ? { email } : {}),
    });
```
```bash
src/app/helpers/handleAlbumTitleChange.ts
  const albumPhotos = photoTitleFilter
    ? filteredPhotos.filter((photo) => albumIds.includes(photo.albumId))
    : await (async () => {
        const response = await fetch(
          `/api/photos?albumId=${albumIds}&start=${(currentPage - 1) * 25}`,
        );
        const data = await response.json();
        console.log("data ", data);
        return data.photos as Photo[];
      })();
```

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
Open http://localhost:3000
```
