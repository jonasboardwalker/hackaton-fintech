// example of schemas

// import { z } from "zod";
// import { routing } from "~/i18n/routing";
// import { type useTranslations } from "next-intl";

// export const createCourseSchema = (t?: ReturnType<typeof useTranslations>) =>
//   z.object({
//     title: z.string().min(1, {
//       message: t?.("course_info.required_title") ?? "Title is required",
//     }),
//     defaultLocale: z.enum(routing.locales),
//   });

// export const getUserCourseSchema = z.object({
//   courseId: z.string(),
//   userId: z.string().optional(),
// });

// export const updateCourseSchema = (t?: ReturnType<typeof useTranslations>) => {
//   return z.object({
//     id: z.string().uuid(), // The course ID to update
//     data: z
//       .object({
//         imageUrl: z.string().optional(),
//         price: z.coerce.number().optional(),
//         isPublished: z.boolean().optional(),
//         categoryId: z
//           .string()
//           .min(
//             1,
//             t ? { message: t("course_info.required_category") } : undefined,
//           )
//           .optional(),
//         defaultLocale: z.enum(routing.locales).optional(), // Example locales
//       })
//       .partial(), // Allow partial updates
//   });
// };
