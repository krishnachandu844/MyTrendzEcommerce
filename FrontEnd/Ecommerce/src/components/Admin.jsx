import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const onClickAddProduct = async () => {
    const productData = { title, image, description, category, price };
    let res = await fetch("http://localhost:3000/myProducts/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (res.ok === true) {
      const data = await res.json();
      toast.info("Product Added");
      setTitle("");
      setDescription("");
      setCategory("");
      setImage("");
      setPrice(0);
    } else {
      toast.error("Unable to Add Product", { position: "bottom-right" });
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
      <Card className='w-2/6 h-auto '>
        <CardHeader className='text-center space-y-2'>
          <CardTitle className='text-3xl'>Admin Dashboard</CardTitle>
          <CardDescription>
            Enter the product details to add in website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <Label htmlFor='name' className='heading-text-color font-medium'>
              Title
            </Label>
            <Input
              type='text'
              name=''
              id='name'
              placeholder='Title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className='space-y-2 mt-4'>
            <Label htmlFor='image'>Image</Label>
            <Input
              type='text'
              name='image'
              id='image'
              placeholder='ImageLink'
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>

          <div className='space-y-2 mt-4'>
            <label htmlFor='Category'>Category</label>
            <Select
              id='Category'
              value={category}
              onValueChange={(value) => {
                setCategory(value);
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Category' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Grocery'>Grocery</SelectItem>
                <SelectItem value='Electronics'>Electronics</SelectItem>
                <SelectItem value='Mobiles'>Mobiles</SelectItem>
                <SelectItem value='Fashion'>Fashion</SelectItem>
                <SelectItem value='Appliances'>Appliances</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2  mt-4'>
            <Label
              htmlFor='description'
              className='heading-text-color font-medium '
            >
              Description
            </Label>
            <Textarea
              id='description'
              placeholder='Description'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className='space-y-2 mt-4'>
            <Label htmlFor='Price'>Price</Label>
            <Input
              type='number'
              name=''
              id='Price'
              placeholder='Price'
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          <div className='mt-5'>
            <Button className='w-full' onClick={onClickAddProduct}>
              Add Product
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
