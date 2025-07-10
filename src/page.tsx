import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  })

type Post = {
    id: number
    title: string
    body: string
  }
  
  function usePosts() {
    return useQuery({
      queryKey: ['posts'],
      queryFn: async (): Promise<Array<Post>> => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        return await response.json()
      },
    })
  }

export default function Page() {

  const queryClient = useQueryClient()
  const { status, data, error, isFetching } = usePosts()

  console.log(data)
  return (
    <div
      className="flex items-center justify-center w-full h-full min-h-full"
      style={{ minHeight: "100vh" }}
    >
      <div>howdy</div>
    </div>
  );
}
