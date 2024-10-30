function Testimony() {
  return (
<div className="relative min-h-screen" style={{backgroundImage: "url('/images/coupletestimony.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
  <div className="absolute inset-0 bg-black/50" />
  
  <div className="relative p-8">
    <h2 className="text-3xl font-bold text-center text-white mb-12">Témoignages</h2>
    
    <div className="flex justify-between max-w-6xl mx-auto px-12 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] flex flex-col w-[300px]">
        <h3 className="font-bold mb-2">Une dinguerie</h3>
        <p className="text-sm text-gray-600 mb-4">Review body</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div>
            <p className="font-medium">Reviewer name</p>
            <p className="text-sm text-gray-500">12 Septembre</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 flex-grow">Contrary to popular belief, Lorem ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] flex flex-col w-[300px]">
        <h3 className="font-bold mb-2">Review Title</h3>
        <p className="text-sm text-gray-600 mb-4">Review body</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div>
            <p className="font-medium">Reviewer name</p>
            <p className="text-sm text-gray-500">Date</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 flex-grow">Contrary to popular belief, Lorem ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] flex flex-col w-[300px]">
        <h3 className="font-bold mb-2">Review Title</h3>
        <p className="text-sm text-gray-600 mb-4">Review body</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div>
            <p className="font-medium">Reviewer name</p>
            <p className="text-sm text-gray-500">Date</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 flex-grow">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
      </div>
    </div>
  </div>
</div>
  );
}

export default Testimony;
