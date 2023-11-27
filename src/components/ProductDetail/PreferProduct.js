import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const PreferProduct = ({
  productPrefer: { _id, productName, image, price },
}) => {
  return (
    <Box className="product-card">
      <Link to={`/products/${_id}`}>
        <Image
          src={image}
          width={[200, 220, 250]}
          height={[200, 220, 250]}
          className="product-image-prefer"
        />
        <Text
          fontSize={[12, 13, 16]}
          className="product-name-prefer"
          fontWeight="bold"
          style={{
            display: "block",
            minWidth: "100px",
            maxWidth: "250px",
            whiteSpace: "initial",
          }}
        >
          {productName}
        </Text>
        <Text fontSize="14px" className="product-price-prefer">
          ${price}
        </Text>
      </Link>
    </Box>
  );
};

export default PreferProduct;
