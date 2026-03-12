import { motion } from "framer-motion";
import { Clock, TrendingUp, Bell, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const newsItems = [
  { type: "Price Update", title: "Sago prices rise by 3% this week", time: "2 hours ago" },
  { type: "Auction News", title: "Record participation in Tuesday auction", time: "Yesterday" },
  { type: "Market Info", title: "Export demand increases for Q4", time: "2 days ago" },
];

const auctionDetails = {
  time: "10:00 AM - 4:00 PM",
  lots: 45,
  status: "Live Now",
  items: [
    { lot: "A1-A15", product: "Premium Sago", quantity: "500 quintals" },
    { lot: "B1-B20", product: "Tapioca Starch", quantity: "750 quintals" },
    { lot: "C1-C10", product: "Broken Sago", quantity: "300 quintals" },
  ],
};

const NewsAuctionSection = () => {
  return (
    <section id="auction" className="section-cinematic bg-muted/20">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Latest News */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Bell className="w-5 h-5 text-secondary" />
              <span className="label-uppercase text-secondary">Latest News</span>
            </div>

            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-floating hover-lift cursor-pointer group"
                >
                  <span className="label-uppercase text-secondary text-xs mb-2 block">{item.type}</span>
                  <h3 className="heading-sm text-foreground mb-2 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {item.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Today's Auction */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span className="label-uppercase text-secondary">Today's Auction</span>
            </div>

            <div className="card-floating">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="body-md text-foreground">{auctionDetails.time}</span>
                </div>
                <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                  {auctionDetails.status}
                </span>
              </div>

              <div className="space-y-4">
                {auctionDetails.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="label-uppercase text-xs text-muted-foreground mb-1">
                        Lot {item.lot}
                      </p>
                      <p className="font-medium text-foreground">{item.product}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.quantity}</p>
                  </div>
                ))}
              </div>

              <Link to="/auction" className="btn-luxury-primary rounded-full w-full mt-6 text-xs inline-block text-center">
                View All Lots
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsAuctionSection;