import Category from "../model/cateModel.js";

export const addMainCate = async (req, res) => {
  const { categoryName } = req.body;
  const existCategory = await Category.findOne({ mainCategory: categoryName });

  if (existCategory) {
    return res.status(401).json({ message: "Categpry already exist" });
  }

  const newCategory = await new Category({
    mainCategory: categoryName,
    subCategory: [],
  });

  await newCategory.save();

  res.status(200).json({ message: "New category created", data: newCategory });
};

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
