import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Box
      sx={{
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      <Card sx={{ textAlign: 'center' }}>
        {/* Image placeholder */}
        <Skeleton variant="rectangular" height={300} sx={{ objectFit: 'contain', margin: 'auto' }} />

        {/* Content placeholder */}
        <CardContent sx={{ pt: 1, px: 2 }}>
          <Skeleton variant="text" width="80%" height={30} sx={{ margin: 'auto' }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ margin: '8px auto' }} />

          <Stack direction="row" gap={1} justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Skeleton variant="text" width={60} height={30} />
            <Skeleton variant="text" width={40} height={20} />
          </Stack>
        </CardContent>

        {/* Button placeholder */}
        <CardContent sx={{ pt: 0, px: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={40} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCardSkeleton;