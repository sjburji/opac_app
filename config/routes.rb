Opac::Application.routes.draw do

  match '/signups/compute' => 'signups#compute'
  
  match '/dashboard' => 'dashboard#show'

  match '/auth/:provider/callback' => 'authentications#create'
  match 'batches' => 'batches#index'
  match 'reassign' => 'reassign#index'
  match 'reassign_ibt_search' => 'reassign#ibt_search'
  match 'reassign_search' => 'ibtrs#reassign_search'
  match 'reassign_edit' => 'reassign#edit'
  match 'upd_reassign' =>'batches#refresh_reassign_task', :method => :post
  get "stock/show"
  get "titles/index"
  get "ibtrs/drillrpt"
  devise_for :users, :path => 'accounts', :controllers => {:registrations => 'registrations'}

  match '/auth/failure' => 'Ibtrs#index'

  match 'ibtrs/search' => 'ibtrs#search'
  match 'ibtrs/lookup' => 'ibtrs#lookup'
  match 'ibtrs/sort' => 'ibtrs#sort', :method => :post
  match 'ibtrs/stats' => 'ibtrs#stats'
  match 'ibtrs_update' => 'ibtrs#titleupd', :method => :post
  match 'consignments/stats' => 'consignments#stats'
  match 'consignments/booksearch' => 'consignments#booksearch'
  match 'consignments/:id/transition/:event' => 'consignments#transition'
  match '/titles/qryAltTitle' => 'titles#qryAltTitle'
  match 'plans/overview' => 'plans#overview'
  resources :titles, :authors, :ibtrs, :branches, :stock, :stockitems, :authentications, :signups, :plans, :coupons, :consignments, :goods, :ibt_reassigns, :batches
  
  match 'statistics/:title_id' => 'statistics#view'
  
  resources :stock_racks_shelves, :ib_assignments
  match 'ibt_pick_req' => 'ib_assignments#pick'
  match 'ibt_unpick_req' => 'ib_assignments#unpick'
  match 'ibt_change_criteria' => 'ib_assignments#change'
  match 'ibt_print' => 'ib_assignments#print'
  match 'ibt_assigned' => 'ib_assignments#change'
  match 'ibtrs_alttitle' => 'ibtrs#setAltTitle'
  match 'ibtrs_drillrpt' =>   'ibtrs#drillrpt'

  match 'memberSearch' => 'signups_report#signups_report'
  match 'report' => 'signups_report#signups_report'
  match 'report_details' => 'signups_report#report_details'
  match 'newMemberReversal' => 'signups_report#newMemberReversal'
  match 'reSendWelcomeMail' => 'signups_report#reSendWelcomeMail'
  match 'rePrintReceipt' => 'signups_report#rePrintReceipt'
  
  match 'planDetails' =>'plans#plandetails'
  match 'totalDetails' =>'plans#paymentdetails'
  match 'planSearch' => 'plans#index'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => "Dashboard#show"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
