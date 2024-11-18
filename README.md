## To Do

ci/cd
show all metadata for current batch
use the same function schema for all get endpoints
style spacing in photodata
explain why i used nextjs
explain why the pagination doesnt get all the data
add api types to api responses

```bash
use single function to parse URLSearchParams
    const params = new URLSearchParams({
      ...(start ? { _start: String(start) } : { _start: "0" }),
      ...(limit ? { _limit: String(limit) } : { _limit: "25" }),
      ...(email ? { email } : {}),
    });
```

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
Open http://localhost:3000
```
