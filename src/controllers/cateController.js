import Category from "../model/cateModel.js";

export const addMainCate = async (req, res) => {
  let { categoryName } = req.body;

  console.log(req.body)

  categoryName = categoryName.trim().toLowerCase();

  const existCategory = await Category.findOne({ mainCategory: categoryName });

  if (existCategory) {
    return res.status(401).json({ message: "Category already exists" });
  }

  const newCategory = new Category({
    mainCategory: categoryName,
    subCategory: [],
  });

  await newCategory.save();

  res.status(200).json({ message: "New category created", data: newCategory });
};

// export const addMainCate = async (req, res) => {
//   try {
//     console.log("Received body:", req.body);  // Important for debugging

//     let { categoryName } = req.body;

//     if (!categoryName) {
//       return res.status(400).json({ message: "Category name is required" });
//     }

//     categoryName = categoryName.trim().toLowerCase();

//     const existCategory = await Category.findOne({ mainCategory: categoryName });

//     if (existCategory) {
//       return res.status(401).json({ message: "Category already exists" });
//     }

//     const newCategory = new Category({
//       mainCategory: categoryName,
//       subCategory: [],
//     });

//     await newCategory.save();

//     res.status(200).json({ message: "New category created", data: newCategory });
//   } catch (error) {
//     console.error("addMainCate Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


export const addSubCate = async (req, res) => {
  const { categoryName, subCateName } = req.body;

  const currentCategory = await Category.findOne({
    mainCategory: categoryName,
  });

  if (!currentCategory) {
    return res.status(404).json({ message: "categpry not found" });
  }

  if (currentCategory.subCategory.includes(subCateName)) {
    return res.status(400).json({ message: "Sub category already exists" });
  }

  currentCategory.subCategory.push(subCateName);

  await currentCategory.save();

  return res
    .status(200)
    .json({ message: "Sub category added", data: currentCategory });
};

export const getCategory = async (req, res) => {
  const categories = await Category.find();
  return res.status(201).json({ message: "All category", data: categories });
};
