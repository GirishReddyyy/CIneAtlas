function Shows({ results }) {

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {results.map((item) => {

        const show = item.show

        return (
          <div
            key={show.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >

            <img
              src={show.image?.medium}
              alt={show.name}
              className="w-full"
            />

            <div className="p-4">

              <h2 className="text-lg font-bold">
                {show.name}
              </h2>

              <p className="text-sm text-gray-500">
                {show.genres.join(", ")}
              </p>

            </div>

          </div>
        )

      })}

    </div>
  )
}

export default Shows